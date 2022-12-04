import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.models';
import { UserDetail } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  // user detail
  _getUserDetails(user: UserDocument): UserDetail {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  // get data all user
  async findAllUser() {
    return this.userModel.find({}).then((user) => {
      return user;
    });
  }

  // find user by email
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // find user by id
  async findById(id: string): Promise<UserDetail | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async create(
    name: string,
    email: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }
}
