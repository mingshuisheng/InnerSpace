import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../entity/user.entity";
import {toUserVo, UserVo} from "./vo/user.vo";
import {HashService} from "../hash/hash.service";

@Injectable()
export class UsersService implements OnApplicationBootstrap {

  constructor(@InjectRepository(User) private userRepository: Repository<User>, private hashService: HashService) {

  }

  async onApplicationBootstrap() {
    if (await this.userRepository.count() > 0) {
      return;
    }
    const user = new User()
    user.name = 'admin'
    user.password = 'admin'
    await this.save(user)
  }

  async findOneUser(name: string): Promise<User> {
    return await this.userRepository.findOneBy({name: name})
  }

  async findOne(username: string): Promise<UserVo | undefined> {
    const user = await this.userRepository.findOneBy({name: username})
    return toUserVo(user);
  }

  async findById(id: number): Promise<UserVo | undefined> {
    const user = await this.userRepository.findOneBy({id: id})
    return toUserVo(user)
  }

  async save(user: User): Promise<UserVo> {
    user.password = await this.hashService.hash(user.password)
    return toUserVo(await this.userRepository.save(user))
  }
}
