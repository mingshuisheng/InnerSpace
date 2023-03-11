import {Injectable} from "@nestjs/common";
import * as bcrypt from 'bcrypt';


@Injectable()
export class HashService {

  static readonly saltRounds: number = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, HashService.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
