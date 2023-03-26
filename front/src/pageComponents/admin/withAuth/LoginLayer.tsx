import {ChangeEvent, FC, FormEvent, memo, useCallback} from "react";
import {Modal} from "@/components";
import {
  setPassword,
  setUserName, submitLogin, useLoginErrorText,
  useLoginLayerOpened,
  usePassword,
  useUserName
} from "./store";
import {Button, Label, TextInput} from "flowbite-react";

export const LoginLayer: FC = memo(() => {
  const isOpen = useLoginLayerOpened()
  const userName = useUserName()
  const password = usePassword()
  const loginErrorText = useLoginErrorText()
  const handleUserNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value), []);
  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), []);
  const handleInput = useCallback((e: FormEvent<HTMLInputElement>) => {
    //如果是回车键，就提交表单
    if (e.nativeEvent instanceof KeyboardEvent && e.nativeEvent.key === 'Enter') {
      e.preventDefault()
      submitLogin().then()
    }
  }, [])
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
