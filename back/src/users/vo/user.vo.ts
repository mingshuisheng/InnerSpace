import {User} from "../../entity/user.entity";

export type UserVo = {
  id: number
  name: string
}

export const toUserVo = (user: User): UserVo => {
  return {
    id: user.id,
    name: user.name
  }
}
