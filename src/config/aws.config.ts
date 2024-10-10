import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => {
    return {
        port: process.env.APP_PORT,
        accessKey: process.env.AWS_ACCESS_KEY_ID,
        accessSecret: process.env.AWS_ACCESS_SECRET,
        region: process.env.AWS_REGION,
        bucket: process.env.AWS_BUCKET,
    };
});
