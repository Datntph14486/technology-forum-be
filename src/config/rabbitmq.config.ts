import { registerAs } from '@nestjs/config';

export default registerAs('rabbitMQ', () => {
    return {
        host: process.env.RABBITMQ_HOST,
        port: process.env.RABBITMQ_PORT,
        user: process.env.RABBITMQ_USERNAME,
        password: process.env.RABBITMQ_PASSWORD,
    };
});
