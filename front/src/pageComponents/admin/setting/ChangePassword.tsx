import {FC, useState} from "react";
import {Button, Label, TextInput} from "flowbite-react";
import {api} from "@/server/api"

export const ChangePassword: FC = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const submit = async () => {
    if (newPassword !== confirmPassword) {
      alert("两次输入的密码不一致")
      return
    }
    try {
      const changePasswordResponse = await api.changePassword(oldPassword, newPassword);
      if (!changePasswordResponse.success) {
        alert(changePasswordResponse.error)
      } else {
        alert("修改成功")
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
      }
    } catch {
      alert("旧密码错误")
    }
  }

  return (
    <div className="w-full flex">
      <form className="w-3/4 flex flex-col gap-2">
        <div className="mb-1 block">
          <Label htmlFor="oldPassword" value="old password"/>
        </div>
        <TextInput value={oldPassword} onInput={e => setOldPassword(e.currentTarget.value)} id="oldPassword"
                   type="password" required={true}/>
        <div className="mb-1 block">
          <Label htmlFor="newPassword" value="new password"/>
        </div>
        <TextInput value={newPassword} onInput={e => setNewPassword(e.currentTarget.value)} id="newPassword"
                   type="password" required={true}/>
        <div className="mb-1 block">
          <Label htmlFor="confirmPassword" value="confirm password"/>
        </div>
        <TextInput value={confirmPassword} onInput={e => setConfirmPassword(e.currentTarget.value)} id="confirmPassword"
                   type="password" required={true}/>
        <Button onClick={submit} className="mt-2" type="button">提交</Button>
      </form>
    </div>
  )
}
