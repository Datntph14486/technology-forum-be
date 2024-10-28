import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscussEntity } from './discuss.entity';
import { DiscussService } from './discuss.service';
import { DiscussController } from './discuss.controller';
import { UserModule } from '../user/user.module';
import { PostModule } from '../post/post.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([DiscussEntity]),
        UserModule,
        PostModule,
        AuthModule,
    ],
    controllers: [DiscussController],
    providers: [DiscussService],
    exports: [DiscussService],
})
export class DiscussModule {}
