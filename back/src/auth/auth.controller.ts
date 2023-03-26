import {Controller, Request, Post, UseGuards, Query, Body} from '@nestjs/common';
import {LocalAuthGuard} from "./local-auth.guard";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {ChangePasswordDto} from "./dto/changePassword.dto";

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

  @UseGuards(JwtAuthGuard)
  @Post('changePassword')
  async changePassword(@Body() params: ChangePasswordDto, @Request() req) {
    return this.authService.changePassword(params, req.user.id);
  }

}
