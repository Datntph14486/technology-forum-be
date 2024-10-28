import { map } from 'rxjs';
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { EXIST_ERROR, NOT_FOUND_ERROR } from 'src/common/constants';
import generatePassword from 'src/common/util/generate-password';
import { TTokens } from '../auth/type';
import { AuthService } from '../auth/auth.service';
import { MailService } from '../mail/mail.service';
import { SendEmailToNewAccountDto } from '../mail/dto/send-email-to-new-account.dto';
import { AwsService } from '../aws/aws.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        // @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,

        private readonly mailService: MailService,

        private readonly awsService: AwsService,
    ) {}

    async create(file: Express.Multer.File, createUserDto: CreateUserDto) {
        const oldUser = await this.userRepository.findOne({
            where: {
                email: createUserDto.email,
            },
        });

        if (oldUser) {
            throw new BadRequestException(EXIST_ERROR.EMAIL_EXIST);
        }

        const password = generatePassword(10);

        const fileUpload = await this.awsService.upload(file);

        const user: UserEntity = await this.userRepository.create({
            email: createUserDto?.email,
            username: createUserDto?.email,
            firstName: createUserDto?.firstName,
            lastName: createUserDto?.lastName,
            gender: createUserDto?.gender,
            phone: createUserDto?.phone,
            blocked: false,
            dateOfBirth: createUserDto?.dateOfBirth,
            country: createUserDto?.country,
            city: createUserDto?.city,
            district: createUserDto?.district,
            fullAddress: createUserDto?.fullAddress,
            password,
            avatar: fileUpload?.id,
        });

        const newUser: UserEntity = await this.userRepository.save(user);

        const tokens: TTokens = await this.authService.generateTokens(
            newUser.id,
            newUser.email,
        );

        const userSendEmail: SendEmailToNewAccountDto = {
            email: newUser.email,
            name: `${newUser.firstName} ${newUser.lastName}`,
            password,
        };

        this.mailService.sendToNewAccount(userSendEmail);

        delete newUser.password;

        return {
            user: newUser,
            tokens,
        };
    }

    async find() {
        const users = await this.userRepository.find({
            relations: {
                avatar: true,
            },
        });

        return users.map((user) => {
            delete user.password;

            return user;
        });
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        delete user.password;

        return user;
    }

    async update(userId: number, dto: UpdateUserDto) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const newUser = await this.userRepository.update(user.id, {
            ...dto,
        });

        return newUser;
    }

    async block(userId: number) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const userUpdated = await this.userRepository.update(
            { id: userId },
            { blocked: true },
        );

        return userUpdated;
    }

    async delete(userId: number) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const userUpdated = await this.userRepository.update(
            { id: userId },
            { deletedAt: new Date() },
        );

        return userUpdated;
    }

    async findById(id: number) {
        const user = await this.userRepository.findOne({
            where: {
                id,
            },
        });

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        return user;
    }
}
