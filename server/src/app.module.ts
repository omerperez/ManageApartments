import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ApartmentModule } from './apartment/apartment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.PG_HOST,
      port: parseInt(<string>env.PG_PORT),
      username: env.PG_USER,
      password: env.PG_PASSWORD,
      database: env.PG_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    ApartmentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
