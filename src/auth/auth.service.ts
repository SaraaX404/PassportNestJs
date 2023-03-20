import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    console.log(user);
    if (!user) {
      return null;
    }

    if (await bcrypt.compare(password, user.password)) {
      const { username, password, name } = user;
      return { name };
    }
    return null;
  }
}
