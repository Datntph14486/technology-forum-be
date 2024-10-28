import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';
import * as dayjs from 'dayjs';
import * as crypto from 'crypto';

import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { SignupDTO } from './dto/signup.dto';
import { TAuth, TTokens } from './type';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSignInDto } from './dto/signin.dto';
import {
    COMMON_MESSAGE,
    EXIST_ERROR,
    NOT_FOUND_ERROR,
    SERVICE_NAME,
    TOKEN_TYPE,
} from 'src/common/constants';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import buildEmailTemplate from 'src/common/util/build-email-template';
import { emailTemplateForgotPassword } from 'src/common/template/forgot-password';
import { MailService } from '../mail/mail.service';
import { SendEmailDto } from '../mail/dto/send-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        private configService: ConfigService,

        private mailService: MailService,

        // @Inject(forwardRef(() => UserService))
        // private userService: UserService,
    ) {}

    async signup(dto: SignupDTO): Promise<TAuth> {
        try {
            const oldUser = await this.userRepository.findOne({
                where: {
                    email: dto.email,
                },
            });

            if (oldUser) {
                throw new BadRequestException(EXIST_ERROR.EMAIL_EXIST);
            }

            const user = await this.userRepository.create({
                email: dto.email,
                username: dto.email,
                password: dto.password,
            });

            const newUser = await this.userRepository.save(user);

            const tokens: TTokens = await this.generateTokens(
                newUser.id,
                newUser.email,
            );

            delete newUser.password;

            await this.updateRefreshTokenHash(newUser.id, tokens.refreshToken);

            return { user, tokens };
        } catch (error) {
            throw error;
        }
    }

    async signIn(dto: AuthSignInDto): Promise<TAuth> {
        const user = await this.userRepository.findOne({
            where: {
                email: dto.email,
            },
        });

        if (!user || (await bcrypt.compareSync(user.password, dto.password))) {
            throw new NotFoundException(COMMON_MESSAGE.INCORRECT_ACCOUNT);
        }

        const tokens: TTokens = await this.generateTokens(user.id, user.email);

        await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

        delete user.password;

        return {
            user,
            tokens,
        };
    }

    async updateRefreshTokenHash(
        userId: number,
        refreshToken: string,
    ): Promise<void> {
        const hashToken = await argon2.hash(refreshToken);

        await this.userRepository.update(userId, {
            hashedRT: hashToken,
        });
    }

    async refreshTokens(userId: number, refreshToken: string): Promise<TAuth> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const appConfig = this.configService.get('app');

        const verifyToken = await this.jwtService.verifyAsync(refreshToken, {
            secret: appConfig.refreshTokenSecret,
        });

        if (!verifyToken) {
            throw new ForbiddenException(COMMON_MESSAGE.ACCESS_DENIED);
        }

        const tokens = await this.generateTokens(user.id, user.email);

        return { user, tokens };
    }

    async generateTokens(userId: number, email: string): Promise<TTokens> {
        const appConfig = this.configService.get('app');

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                { sub: userId, email },
                {
                    secret: appConfig.accessTokenSecret,
                    expiresIn: appConfig.accessTokenLifeTime * 60,
                },
            ),
            this.jwtService.signAsync(
                { sub: userId, email },
                {
                    secret: appConfig.refreshTokenSecret,
                    expiresIn: appConfig.refreshTokenLifeTime * 24 * 60 * 60,
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async logout(userId: number) {
        await this.userRepository.update(userId, {
            hashedRT: null,
        });
    }

    async verifyToken(accessToken: string, tokenType: TOKEN_TYPE) {
        const appConfig = this.configService.get('app');

        const tokenSecret =
            tokenType === TOKEN_TYPE.ACCESS_TOKEN
                ? appConfig.accessTokenSecret
                : appConfig.refreshTokenSecret;

        const verifyToken = await this.jwtService.verifyAsync(accessToken, {
            secret: tokenSecret,
        });

        if (!verifyToken) {
            throw new ForbiddenException(COMMON_MESSAGE.ACCESS_DENIED);
        }

        return verifyToken;
    }

    async forgotPassword(dto: ForgotPasswordDto) {
        const oldUser = await this.userRepository.findOne({
            where: {
                email: dto.email,
            },
        });

        if (!oldUser) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const digitToken = crypto.randomBytes(64).toString('hex');

        const templateString = buildEmailTemplate(emailTemplateForgotPassword, {
            number: digitToken,
        });

        const data: SendEmailDto = {
            target: dto.email,
            content: templateString,
            subject: `[${SERVICE_NAME}] Forgot password`,
        };

        await this.mailService.send(data);

        const forgotPasswordExpiredAt = dayjs().add(5, 'minutes').toDate();

        await this.userRepository.update(
            { email: dto.email },
            {
                forgotPasswordExpiredAt,
                forgotPasswordToken: digitToken,
            },
        );

        return true;
    }

    async resetPassword(dto: ResetPasswordDto) {
        const { password, passwordConfirmation, token } = dto;

        if (password != passwordConfirmation) {
            throw new BadRequestException(COMMON_MESSAGE.PASSWORD_NOT_MATCH);
        }

        const user = await this.userRepository.findOne({
            where: {
                forgotPasswordToken: token,
            },
        });

        if (!user) {
            throw new BadRequestException(COMMON_MESSAGE.TOKEN_INVALID);
        }

        const currentTime = dayjs();

        if (currentTime.isAfter(user.forgotPasswordExpiredAt)) {
            throw new BadRequestException(
                COMMON_MESSAGE.RESET_PASSWORD_EXPIRED,
            );
        }

        await this.userRepository.update(user.id, {
            forgotPasswordToken: null,
            password: await bcrypt.hash(password, 10),
        });

        return true;
    }

    async getRoleByUserId(userId: number): Promise<string> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        return user.role;
    }
}
