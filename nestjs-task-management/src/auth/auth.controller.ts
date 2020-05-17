import { Controller, Post, Body, Inject, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { Injector } from '@nestjs/core/injector/injector';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<void> {
    return this.authService.signup(authCredentialsDTO);
  }
}
