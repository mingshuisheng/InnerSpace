import {Controller, Get, UseGuards} from "@nestjs/common";
import {UsersService} from "./users.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUser(){
    return this.usersService.findById(1)
  }
}
