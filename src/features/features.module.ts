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
    ],
})
export class FeaturesModule {}
