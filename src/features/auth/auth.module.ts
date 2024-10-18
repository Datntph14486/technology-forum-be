import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), MailModule],
    controllers: [AuthController],
    providers: [ConfigService, AuthService, JwtService],
    exports: [AuthService],
})
export class AuthModule {}
