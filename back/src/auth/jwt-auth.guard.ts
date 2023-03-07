import {ExecutionContext, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

// @ts-ignore
@Injectable({providedIn: 'root'})
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    //获取Authorization的值
    const authHeader = request.headers.authorization;
    //如果没有Authorization的值，返回false
    if (!authHeader) {
      return false;
    }

    //验证Authorization的值是否正确
    const token = authHeader.split(' ')[1];
    const decode = this.jwtService.decode(token);
    if ((decode as Record<string, any>).type !== 'access_token') {
      return false;
    }

    return super.canActivate(context)
  }
}
