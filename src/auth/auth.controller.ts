import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post('refresh')
  refresh(@Body() body: any) {
    return this.authService.refreshToken(body.userId, body.refreshToken);
  }

  @Post('logout')
  logout(@Body() body: any) {
    return this.authService.logout(body.userId);
  }
}