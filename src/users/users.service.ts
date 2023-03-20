import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './user.model';
import * as bcrypt from 'bcrypt';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly UserModel: Model<Users>) {}
  async register(userData: Users) {
    const salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(userData.password, salt);
    return this.UserModel.create(userData);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.UserModel.findOne({ username: username });
  }
}
