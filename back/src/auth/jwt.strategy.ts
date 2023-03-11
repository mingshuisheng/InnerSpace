import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {jwtConstants} from "./constants";
import {UserInfo} from "./user.info";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  async validate(userInfo: UserInfo) {
    return userInfo;
  }

}
