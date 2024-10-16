import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { RequestPostModule } from './request-post/request-post.module';

@Module({
    imports: [
        AuthModule,
        AwsModule,
        MailModule,
        UserModule,
        FileModule,
        RequestPostModule,
    ],
    exports: [
        AuthModule,
        AwsModule,
        MailModule,
        UserModule,
        FileModule,
        RequestPostModule,
    ],
})
export class FeaturesModule {}
