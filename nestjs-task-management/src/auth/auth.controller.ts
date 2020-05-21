import {
  Controller,
  Post,
  Body,
  Inject,
  ValidationPipe,
  UnauthorizedException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { Injector } from '@nestjs/core/injector/injector';
import { AuthService } from './auth.service';
import {JwtPayload} from './jwt-payload-interface'
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user-decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<void> {
    return this.authService.signup(authCredentialsDTO);
  }

  @Post('/signin')
  signin(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO): Promise<{accessToken: string}> {
    const results = this.authService.signin(authCredentialsDTO);

    if (results === null) {
      throw new UnauthorizedException();
    }

    return results;
  }

  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@GetUser() user:User){
  //   console.log(user)
  // }  
}
