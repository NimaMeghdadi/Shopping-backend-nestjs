import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/adduser")
  async addUser(
    @Body('fName') fName: string,
    @Body('lName') lName: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('roleID') roleID: number,
    @Body('phone') phone: string,
    @Body('email') email: string,
    @Body('imgURL') imgURL: string,
  ) {
    const generatedId = await this.userService.insertUser(
      fName,
      lName,
      username,
      password,
      roleID,
      phone,
      email,
      imgURL,
      );
    return { id: generatedId };
  }

  @Get(':id')
  async getSingleUser(@Param('id') userID: string) {
    const User = await this.userService.getSingleUser(userID);
    return User;
  }

  @Get()
  async getAllUser() {
    const Users = await this.userService.getAllUsers();
    return Users;
  }

  @Delete(':id')
  async removeUser(@Param('id') UserID: string) {
    await this.userService.deleteUser(UserID);
    return null;
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('fName') fName: string,
    @Body('lName') lName: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('roleID') roleID: number,
    @Body('phone') phone: string,
    @Body('email') email: string,
    @Body('imgURL') imgURL: string,
  ) {
    await this.userService.updateUser(
      userId,
      fName,
      lName,
      username,
      password,
      roleID,
      phone,
      email,
      imgURL,
    );
    return null;
  }
}
