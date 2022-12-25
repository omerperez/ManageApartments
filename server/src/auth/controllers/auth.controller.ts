import { Body, Controller, Delete, Ip, Post, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import RefreshTokenDto from '../dto/refresh-token.dto';
import { LoginDto, Verify } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() request, @Ip() ip: string, @Body() body: LoginDto) {
    return this.authService.login(body.mobile, body.password, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    });
  }

  @Post('verify')
  async verify(@Req() request, @Ip() ip: string, @Body() body: Verify) {
    return this.authService.verify(body.token);
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken);
  }
}
