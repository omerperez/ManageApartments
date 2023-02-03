import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { S3Module } from './s3/s3.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApartmentModule } from './modules/apartment/apartment.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://db_user:omer200198@cluster0.nf5ea.mongodb.net/?retryWrites=true&w=majority'),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    ApartmentModule,
    TenantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
