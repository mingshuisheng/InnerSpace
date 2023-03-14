import {Controller, Request, Post, UseGuards, Query, Body} from '@nestjs/common';
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

  @Post('refresh')
  async refresh(@Body() body) {
    return this.authService.refresh(body.refreshToken);
  }

  @Post('checkToken')
  async checkToken(@Body() params: {token: string}) {
    return this.authService.checkToken(params.token);
  }

}
