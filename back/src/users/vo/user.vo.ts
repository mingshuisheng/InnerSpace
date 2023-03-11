import {User} from "../../entity/user.entity";

export class UserVo{
  id: number
  name: string
}

export const toUserVo = (user: User): UserVo => {
  const userVo = new UserVo();
  userVo.id = user.id;
  userVo.name = user.name;
  return userVo
}
