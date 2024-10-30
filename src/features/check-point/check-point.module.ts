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
    ],
    controllers: [CheckPointController],
    providers: [CheckPointService],
    exports: [CheckPointService],
})
export class CheckPointModule {}
