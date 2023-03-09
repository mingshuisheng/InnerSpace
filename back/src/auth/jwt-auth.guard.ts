import {ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
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
    //如果没有Authorization的值，则抛出未授权异常
    if (!authHeader) {
      throw new UnauthorizedException();
    }

    //验证Authorization的类型是否正确，如果不正确则抛出未授权异常
    const token = authHeader.split(' ')[1];
    const decode = this.jwtService.decode(token);
    if ((decode as Record<string, any>).type !== 'access_token') {
      throw new UnauthorizedException();
    }

    return super.canActivate(context)
  }
}
