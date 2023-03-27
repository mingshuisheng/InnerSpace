import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {UserInfo} from "./user.info";
import {Request} from "express";
import {JwtService} from "@nestjs/jwt";
import {Strategy} from 'passport-strategy';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'cookie-jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  //从cookie中获取token，然后解析token，将解析出来的用户信息返回
  async authenticate(req: Request, options?: any) {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return this.fail({message: "authenticate error"}, 401);
    }

    const verify = await this.jwtService.verifyAsync(accessToken);
    if (!verify || verify.type !== "access_token") {
      return this.fail({message: "authenticate error"}, 401);
    }

    return this.success(verify);
  }

  async validate(userInfo: UserInfo) {
    return userInfo;
  }

}
