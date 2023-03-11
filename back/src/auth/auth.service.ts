import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from '@nestjs/jwt';
import {HashService} from "../hash/hash.service";
import {UserInfo} from "./user.info";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hashService: HashService
  ) {
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneUser(username);
    if (user && await this.hashService.compare(password, user.password)) {
      const {id, name} = user;
      return {id, name};
    }
    return null;
  }

  async login(userInfo: UserInfo) {
    return this.getToken(userInfo)
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
      return this.getToken({id: user.id, name: user.name})
    } catch (e) {
      return {
        error: "Invalid refresh token"
      }
    }
  }

  private getToken(userInfo: UserInfo) {
    return {
      accessToken: this.jwtService.sign({...userInfo, type: "access_token"}, {expiresIn: "1h"}),
      refreshToken: this.jwtService.sign({...userInfo, type: "refresh_token"}, {expiresIn: "7d"})
    }
  }
}
