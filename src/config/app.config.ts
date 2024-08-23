import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
    return {
        port: process.env.APP_PORT,
        accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
        refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        refreshTokenLifeTime: process.env.REFRESH_TOKEN_LIFE_TIME,
        accessTokenLifeTime: process.env.ACCESS_TOKEN_LIFE_TIME,
    };
});
