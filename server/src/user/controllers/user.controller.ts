import { Body, Controller, Post } from '@nestjs/common';
import { UpdateUser, User, UserId } from '../modules/user.interface';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() user: User) {
    return await this.userService.register(user);
  }

  @Post('edit')
  async edit(@Body() user: UpdateUser) {
    return await this.userService.edit(user);
  }

  @Post('delete')
  async delete(@Body() userId: UserId) {
    return await this.userService.delete(userId);
  }
}
