import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {username: user.username, sub: user.userId};
    return this.getToken(payload)
  }

  async refresh(refresh_token: string) {
    try {
      const verify = await this.jwtService.verifyAsync(refresh_token);
      if (verify.type !== "refresh_token") {
        return {
          error: "Invalid refresh token"
        }
      }
      const user = await this.usersService.findById(verify.sub);
      const payload = {username: user.username, sub: user.userId};
      return this.getToken(payload)
    } catch (e) {
      return {
        error: "Invalid refresh token"
      }
    }
  }

  private getToken(payload: {username: string, sub: number}) {
    return {
      accessToken: this.jwtService.sign({...payload, type: "access_token"}, {expiresIn: "1h"}),
      refreshToken: this.jwtService.sign({...payload, type: "refresh_token"}, {expiresIn: "7d"})
    }
  }
}
