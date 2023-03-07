import {Controller, Request, Get, Post, UseGuards, Query} from '@nestjs/common';
import {LocalAuthGuard} from "./local-auth.guard";
import {AuthService} from "./auth.service";

@Controller("auth")
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('refresh')
  async refresh(@Query() query) {
    return this.authService.refresh(query.refresh_token);
  }

}
