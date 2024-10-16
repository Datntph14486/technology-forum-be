import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';

@Module({
    imports: [AuthModule, AwsModule, MailModule, UserModule, FileModule],
    exports: [AuthModule, AwsModule, MailModule, UserModule, FileModule],
})
export class FeaturesModule {}
