import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as AWS from 'aws-sdk';
import * as bodyParser from 'body-parser';
import { env } from 'process';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  // app.enableCors({
  //   origin: ""
  // });
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  AWS.config.update({
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region: env.AWS_REGION,
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