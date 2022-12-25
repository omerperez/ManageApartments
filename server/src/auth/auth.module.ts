import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/services/user.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import RefreshToken from './entities/refresh-token.entity';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken, UserModule])],
  controllers: [AuthController],
  providers: [UserService, AuthService, JwtStrategy],
})
export class AuthModule {}
