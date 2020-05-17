import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDTO;

    //const exists = this.findOne({ username });

    const user = new User();
    user.username = username;
    user.password = password;
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `User with username ${username} already exists`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
