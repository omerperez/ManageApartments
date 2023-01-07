import { Module } from '@nestjs/common';
import { S3Service } from './services/s3.service';
import { S3Controller } from './controllers/s3.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicFile } from './modules/s3.modules';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile])],
  providers: [S3Service],
  controllers: [S3Controller]
})
export class S3Module { }
