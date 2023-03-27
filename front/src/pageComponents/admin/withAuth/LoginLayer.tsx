import {ChangeEvent, FC, FormEvent, memo, useCallback} from "react";
import {Modal} from "@/components";
import {
  checkLoginStatus,
  handleInput, handlePasswordChange,
  handleUserNameChange,
  submitLogin, useLoginErrorText,
  useLoginLayerOpened,
  usePassword,
  useUserName
} from "./store";
import {Button, Label, TextInput} from "flowbite-react";
import {useMount} from "ahooks";

export const LoginLayer: FC = memo(() => {
  const isOpen = useLoginLayerOpened()
  const userName = useUserName()
  const password = usePassword()
  const loginErrorText = useLoginErrorText()

  //校验当前登录状态
  useMount(checkLoginStatus)

  return (
    <Modal show={isOpen}>
      <Modal.Body>
        <div className="w-0 h-2"/>
        <h1 className="text-2xl">管理员登录</h1>
        <div className="text-red-600">{loginErrorText}</div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="username"
              value="用户名"
            />
          </div>
          <TextInput
            id="username"
            placeholder="请输入用户名"
            required={true}
            value={userName}
            onChange={handleUserNameChange}
            onKeyDown={handleInput}
          />
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password"
                value="用户名"
              />
            </div>
            <TextInput
              id="password"
              placeholder="请输密码"
              type="password"
              required={true}
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={handleInput}
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <Button onClick={submitLogin} className="w-1/2">登录</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
})

LoginLayer.displayName = "LoginLayer"
