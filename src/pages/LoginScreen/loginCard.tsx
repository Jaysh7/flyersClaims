/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { bgImage, loginImage } from "../../assets/images";
import auth from "../../services/firebase/auth.firebase";
import { useAuth } from "../../zustand/auth.slice";
import { Logo } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginCard = () => {
  const [error, setError] = useState(false);
  const authSlice: any = useAuth();
  const onFinish = ({ email, password }: any) => {
    auth.login(email, password, authSlice.addAuthData);
    if (email.email === "Jay@email.com" && password.password !== "123456") {
      setError(true);
      return;
    }
  };
  console.log(authSlice, "authslice");
  console.log(onFinish, "on");
  const navigate = useNavigate();
  const emailRules = [
    {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address!",
    },
  ];
  const passwordRules = [
    {
      required: true,
      message: "Please input your password!",
    },
    {
      pattern: /^.{5,}$/,
      message: "Password should contain at least 5 characters",
    },
  ];

  return (
    <div className="bg-[#E4DEDE] h-screen w-full flex justify-center items-center relative">
      <div className="w-full h-full overflow-hidden">
        <img src={bgImage} />
      </div>
      <section
        className="bg-white border border-neutral-300 shadow-[0px_4px_19.5px_0px_rgba(0,0,0,0.25)] 
      rounded-[5px] border-solid w-[65%] h-[70%] absolute flex justify-evenly items-center"
      >
        <section className="flex items-center flex-col w-[40%]">
          <div className="flex w-[100%]">
            <Logo />
          </div>

          <Form layout="vertical" onFinish={onFinish} className="mt-7">
            <Form.Item
              label="Email Id"
              name="email"
              rules={emailRules}
              className="w-full text-black text-base font-semibold"
            >
              <Input placeholder="Enter employee mail ID" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={passwordRules}
              className="w-full text-black text-base font-semibold"
            >
              <Input.Password />
            </Form.Item>
            {error && (
              <div style={{ color: "red" }}>
                Incorrect password for the provided email
              </div>
            )}
            <Form.Item>
              <Button
                type="primary"
                className="w-full bg-[#7700C7]"
                htmlType="submit"
              >
                Login
              </Button>
            </Form.Item>
            <div className="flex gap-40">
              <p>Don't have a Flyer’s account?</p>
              <a onClick={() => navigate("/signup")}>Sign Up Now</a>
            </div>
          </Form>
        </section>
        <span className="w-[1px] h-[80%] flex items-center justify-center bg-[#989898]"></span>
        <img src={loginImage} />
      </section>
    </div>
  );
};

export default LoginCard;
