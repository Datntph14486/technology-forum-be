import { DeviceTokenController } from './device-token.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceTokenEntity } from './device-token.entity';
import { DeviceTokenService } from './device-token.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([DeviceTokenEntity]), UserModule],
    controllers: [DeviceTokenController],
    providers: [DeviceTokenService],
    exports: [DeviceTokenService],
})
export class DeviceTokenModule {}
