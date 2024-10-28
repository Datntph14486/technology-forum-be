import { Module } from '@nestjs/common';
import { TechnologyController } from './technology.controller';
import { TechnologyService } from './technology.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnologyEntity } from './technology.entity';
import { AwsModule } from '../aws/aws.module';

@Module({
    imports: [TypeOrmModule.forFeature([TechnologyEntity]), AwsModule],
    controllers: [TechnologyController],
    providers: [TechnologyService],
    exports: [TechnologyService],
})
export class TechnologyModule {}
