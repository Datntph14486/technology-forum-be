import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { SignupDTO } from './dto/signup.dto';
import { TAuth, TTokens } from './type';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSigninDto } from './dto/signin.dto';
import { COMMON_MESSAGE, NOT_FOUND_ERROR } from 'src/common/constants';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        private configService: ConfigService,
    ) {}

    async signup(dto: SignupDTO): Promise<TAuth> {
        try {
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

            return { user, tokens };
        } catch (error) {
            throw error;
        }
    }

    async signin(dto: AuthSigninDto): Promise<TAuth> {
        const user = await this.userRepository.findOne({
            where: {
                username: dto.username,
            },
        });

        if (!user || bcrypt.compareSync(user.password, dto.password)) {
            throw new NotFoundException(COMMON_MESSAGE.INCORRECT_ACCOUNT);
        }

        const tokens: TTokens = await this.generateTokens(user.id, user.email);

        return {
            user,
            tokens,
        };
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

        if (!verifyToken)
            throw new ForbiddenException(COMMON_MESSAGE.ACCESS_DENIED);

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
}
