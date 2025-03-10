import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { RequestPostModule } from './request-post/request-post.module';
import { TechnologyModule } from './technology/technology.module';
import { PostModule } from './post/post.module';
import { TemplateModule } from './template/template.module';
import { TopicModule } from './topic/topic.module';
import { DiscussModule } from './discuss/discuss.module';
import { RequestQuestionModule } from './request-question/request-question.module';
import { QuestionModule } from './question/question.module';
import { CheckPointModule } from './check-point/check-point.module';
import { AnswerModule } from './answer/answer.module';
import { FollowModule } from './follow/follow.module';
import { FollowLinkModule } from './follow-links/follow-links.module';
import { RabbitMQModule } from './rabbit-mq/rabbit-mq.module';
import { FirebaseModule } from './firebase/firebase.module';
import { DeviceTokenModule } from './device-token/device-token.module';

@Module({
    imports: [
        AuthModule,
        AwsModule,
        MailModule,
        UserModule,
        FileModule,
        RequestPostModule,
        TechnologyModule,
        PostModule,
        TemplateModule,
        TopicModule,
        DiscussModule,
        RequestQuestionModule,
        QuestionModule,
        AnswerModule,
        CheckPointModule,
        FollowModule,
        FollowLinkModule,
        RabbitMQModule,
        FirebaseModule,
        DeviceTokenModule,
    ],
    exports: [
        AuthModule,
        AwsModule,
        MailModule,
        UserModule,
        FileModule,
        RequestPostModule,
        TechnologyModule,
        PostModule,
        TemplateModule,
        TopicModule,
        DiscussModule,
        RequestQuestionModule,
        QuestionModule,
        AnswerModule,
        CheckPointModule,
        FollowModule,
        FollowLinkModule,
        RabbitMQModule,
        FirebaseModule,
        DeviceTokenModule,
    ],
})
export class FeaturesModule {}
