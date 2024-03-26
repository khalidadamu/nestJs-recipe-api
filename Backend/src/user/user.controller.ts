import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./Schema/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }
}
