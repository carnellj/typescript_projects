import { Injectable } from '@nestjs/common';
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
}
