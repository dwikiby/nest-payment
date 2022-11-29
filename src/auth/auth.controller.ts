import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { NewUserDTO } from 'src/user/dto/new-user.dto';
import { AuthService } from './auth.service';
import { UserDetail } from 'src/user/user.interface';
import { ExistingUserDTO } from 'src/user/dto/existing-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // register user
  @Post('register')
  register(@Body() user: NewUserDTO): Promise<UserDetail | null> {
    return this.authService.register(user);
  }
  // login user
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: ExistingUserDTO): Promise<{ token: string } | null> {
    return this.authService.login(user);
  }
}
