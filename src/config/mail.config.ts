import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => {
    return {
        host: process.env.MAIL_HOST,
        user: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD,
    };
});
