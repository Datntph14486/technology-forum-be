import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/features/user/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            name: 'default',
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('database.host'),
                port: configService.get<number>('database.port'),
                username: configService.get<string>('database.username'),
                password: configService.get<string>('database.password'),
                database: configService.get<string>('database.name'),
                autoLoadEntities: true,
                entities: [UserEntity],
                synchronize: true,
                ssl: {
                    rejectUnauthorized: false,
                },
            }),
        }),
    ],
})
export class DatabaseModule {}
