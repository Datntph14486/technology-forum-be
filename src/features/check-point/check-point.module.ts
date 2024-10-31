import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckPointEntity } from './check-point.entity';
import { CheckPointController } from './check-point.controller';
import { CheckPointService } from './check-point.service';
import { UserModule } from '../user/user.module';
import { PostEntity } from '../post/post.entity';
import { DiscussEntity } from '../discuss/discuss.entity';
import { QuestionEntity } from '../question/question.entity';
import { AnswerEntity } from '../answer/answer.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CheckPointEntity,
            PostEntity,
            DiscussEntity,
            QuestionEntity,
            AnswerEntity,
        ]),
        UserModule,
        AuthModule,
    ],
    controllers: [CheckPointController],
    providers: [CheckPointService],
    exports: [CheckPointService],
})
export class CheckPointModule {}
