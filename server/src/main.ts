import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as AWS from 'aws-sdk';
import { env } from 'process';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  AWS.config.update({
    accessKeyId: 'AKIARRGFTIZHJTUKLAAU',
    // env.AWS_ACCESS_KEY_ID,
    secretAccessKey: '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',
    // env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-1',
    // env.AWS_REGION,
  });
  const config = new DocumentBuilder()
    .setTitle('Apartment Manager Backend Documents')
    .setDescription('Apartment Manager backend using postgreSQL & NestJS ')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();