import React, {FC} from "react";
import {Button, Label, TextInput} from "flowbite-react";

export const ChangePassword: FC = () => {
  return (
    <div className="w-full flex">
      <form className="w-3/4 flex flex-col gap-2">
        <div className="mb-1 block">
          <Label htmlFor="oldPassword" value="old password"/>
        </div>
        <TextInput id="oldPassword" type="password" required={true}/>
        <div className="mb-1 block">
          <Label htmlFor="newPassword" value="new password"/>
        </div>
        <TextInput id="newPassword" type="password" required={true}/>
        <div className="mb-1 block">
          <Label htmlFor="confirmPassword" value="confirm password"/>
        </div>
        <TextInput id="confirmPassword" type="password" required={true}/>
        <Button className="mt-2" type="button">提交</Button>
      </form>
    </div>
  )
}
