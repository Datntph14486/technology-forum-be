import { UserEntity } from 'src/features/user/user.entity';

export type TTokens = {
    accessToken: string;
    refreshToken: string;
};

export type TAuth = {
    user: UserEntity;
    tokens: TTokens;
};

export type JwtPayload = {
    sub: string;
    email: string;
};
