import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import appConfig from './config/app.config';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './config/database.config';
import { FeaturesModule } from './features/features.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import awsConfig from './config/aws.config';
import mailConfig from './config/mail.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, databaseConfig, awsConfig, mailConfig],
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
            signOptions: { expiresIn: '60s' },
        }),
        DatabaseModule,
        FeaturesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: 5 });
    }
}
