import { TTokens } from 'src/features/auth/type';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../user.entity';
import { UpdateResult } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserService {
    create(
        file: Express.Multer.File,
        createUserDto: CreateUserDto,
    ): Promise<{
        user: UserEntity;
        tokens: TTokens;
    }>;

    find(): Promise<UserEntity[]>;

    findByEmail(email: string): Promise<UserEntity>;

    update(userId: number, dto: UpdateUserDto): Promise<UpdateResult>;

    block(userId: number): Promise<UpdateResult>;

    delete(userId: number): Promise<UpdateResult>;

    findById(id: number): Promise<UserEntity>;
}

export enum INCREASE_OR_DECREMENT {
    INCREASE = 'increase',
    DECREMENT = 'decrement',
}
