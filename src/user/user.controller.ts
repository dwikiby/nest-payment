import { Controller, Get, Param } from '@nestjs/common';
import { UserDetail } from './user.interface';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtGuards } from 'src/auth/guard/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDetail | null> {
    return this.userService.findById(id);
  }

  // get data all user
  @UseGuards(JwtGuards)
  @Get()
  getAllUser() {
    return this.userService.findAllUser();
  }
}
