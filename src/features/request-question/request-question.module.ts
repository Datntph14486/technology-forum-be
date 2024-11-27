import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { RequestQuestionService } from './request-question.service';
import { RequestQuestionController } from './request-question.controller';
import { QuestionModule } from '../question/question.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestQuestionEntity } from './request-question.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([RequestQuestionEntity]),
        UserModule,

        AuthModule,
        forwardRef(() => QuestionModule),
    ],
    providers: [RequestQuestionService],
    exports: [RequestQuestionService],
    controllers: [RequestQuestionController],
})
export class RequestQuestionModule {}
