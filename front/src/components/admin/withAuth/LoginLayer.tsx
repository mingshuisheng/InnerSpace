import {ChangeEvent, FC, memo, useCallback} from "react";
import {Modal} from "@/components";
import {
  setPassword,
  setUserName, submitLogin, useLoginError,
  useLoginLayerOpened,
  usePassword,
  useUserName
} from "@/components/admin/withAuth/store";
import {Button, Label, TextInput} from "flowbite-react";

export const LoginLayer: FC = memo(() => {
  const isOpen = useLoginLayerOpened()
  const userName = useUserName()
  const password = usePassword()
  const loginError = useLoginError()
  const handleUserNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value), [setUserName]);
  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [setPassword]);
  return (
    <Modal show={isOpen}>
      <Modal.Body>
        <div className="w-0 h-2"/>
        <h1 className="text-2xl">管理员登录</h1>
        {
          !loginError? "":
            <div className="text-red-600">登录失败</div>
        }
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
