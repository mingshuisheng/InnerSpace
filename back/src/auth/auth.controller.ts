import {Controller, Post, UseGuards, Body, Res, Req} from '@nestjs/common';
import {LocalAuthGuard} from "./local-auth.guard";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {ChangePasswordDto} from "./dto/changePassword.dto";
import {Response, Request} from "express";

@Controller("auth")
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res() res: Response) {
    const {accessToken, refreshToken} = await this.authService.login(req.user);

    //将token设置到cookie中，accessToken设置时间长度为1小时，refreshToken设置时间长度为7天
    res.cookie('accessToken', accessToken, {maxAge: 1000 * 60 * 60, httpOnly: true});
    res.cookie('refreshToken', refreshToken, {maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true});
    res.send({success: true});
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const result = await this.authService.refresh(req.cookies.refreshToken);
    if ("error" in result) {
      res.send(result);
      return
    }

    //将token设置到cookie中，accessToken设置时间长度为1小时，refreshToken设置时间长度为7天
    res.cookie('accessToken', result.accessToken, {maxAge: 1000 * 60 * 60, httpOnly: true});
    res.cookie('refreshToken', result.refreshToken, {maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true});

    res.send({success: true});
  }

  @Post('checkToken')
  async checkToken(@Req() req: Request) {
    return this.authService.checkToken(req.cookies.accessToken || req.body.token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('changePassword')
  async changePassword(@Body() params: ChangePasswordDto, @Req() req) {
    return this.authService.changePassword(params, req.user.id);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.send({success: true});
  }

}
