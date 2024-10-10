import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';

@Module({ imports: [AuthModule, AwsModule], exports: [AuthModule, AwsModule] })
export class FeaturesModule {}
