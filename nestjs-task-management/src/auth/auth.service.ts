import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Injector } from '@nestjs/core/injector/injector';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signup(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.signUp(authCredentialsDTO);
  }

  async signin(authCredentialsDTO): Promise<void> {
    //use an await after this statement if we want to do anything other just return
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDTO,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
