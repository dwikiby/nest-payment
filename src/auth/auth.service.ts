import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ExistingUserDTO } from 'src/user/dto/existing-user.dto';
import { NewUserDTO } from 'src/user/dto/new-user.dto';
import { UserDetail } from 'src/user/user.interface';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // hash password user
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  // register user
  async register(user: Readonly<NewUserDTO>): Promise<UserDetail | any> {
    const { name, email, password } = user;

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) return 'Email taken!';

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userService.create(name, email, hashedPassword);
    return this.userService._getUserDetails(newUser);
  }

  // checking user password
  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // checking validate user
  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetail | null> {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;

    if (!doesUserExist) return null;
    const doesPasswordMactch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMactch) return null;
    return this.userService._getUserDetails(user);
  }

  // login user
  async login(
    existingUser: ExistingUserDTO,
  ): Promise<{ token: string } | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user) return null;
    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }
}
