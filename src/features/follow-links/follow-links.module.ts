import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowLinkEntity } from './follow-links.entity';
import { FollowController } from '../follow/follow.controller';
import { FollowLinkService } from './follow-links.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([FollowLinkEntity]), UserModule],
    controllers: [FollowController],
    providers: [FollowLinkService],
    exports: [FollowLinkService],
})
export class FollowLinkModule {}
