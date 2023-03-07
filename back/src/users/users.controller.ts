import {Controller, Get} from "@nestjs/common";

@Controller('users')
export class UsersController {

  @Get()
  getUser(){
    return {name: "zhang san", id:1}
  }
}
