import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
    return {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
    };
});
