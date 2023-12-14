import React, { useState } from "react";
import { Logo } from "../../assets";
import { Button, Form, Input } from "antd";
import { loginImage } from "../../assets/images";

const LoginCard = () => {
  // type InitialStateType = {
  //     mail: string,
  //     password: string
  //   };
  // const initialState = {
  //     mail: '',
  //     password: ''
  //   };
  //   const [user, setUser] = useState<InitialStateType>(initialState);

  const onFinish = ({ email, password }: any) => {
    console.log(email);
    console.log(password);
  };

  return (
    <div className="border border-neutral-300 shadow-lg bg-white flex w-[700px] flex-col rounded-md border-solid p-5 mt-10">
      <div>
        <Logo />
      </div>
      <div className="flex divide-x gap-7">
        <div className="flex flex-col justify-center">
          <section className="mt-5">
            <span className="text-neutral-700 text-xl font-bold leading-10 tracking-tight">
              Sign in
            </span>
            <Form
              layout="vertical"
              style={{ maxWidth: 600 }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Email Id"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
                className="w-full text-black text-base font-semibold"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                className="w-full text-black text-base font-semibold"
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button  type="primary" className="w-full bg-[#7700C7]" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </section>
        </div>

        <div className="flex flex-col justify-center">
          <section className="mt-5 flex flex-col justify-center items-center">
            <img src={loginImage} />
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor{" "}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
