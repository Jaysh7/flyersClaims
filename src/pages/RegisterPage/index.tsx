/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { BG, RegisterImage } from "../../assets/images";
import { Button, Form, Input, Select } from "antd";
import { Logo } from "../../assets/icons";
import { useAuth } from "../../zustand/auth.slice";
import auth from "../../services/firebase/auth.firebase";
import { getAllDepartments } from "../../services/firebase/database.firebase";
import { useEffect, useState } from "react";

const RegisterPage = () => {
  const authSlice: any = useAuth();
  const [departments, setDepartments] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const data = await getAllDepartments();
      if (departments) {
        setDepartments(data);
      }
    })();
  }, []);

  const onFinish = (data: any) => {
    auth.register(
      {
        ...data,
        emailVerified: false,
        isLead: false,
        isFinanceAdmin: false,
        isAdmin: false
      },
      authSlice.addAuthData
    );
  };
  const emailRules = [
    {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      required: true,
      message: "Please enter a valid email address!"
    }
  ];
  const passwordRules = [
    {
      required: true,
      message: "Please input your password!"
    },
    {
      pattern: /^.{6,}$/,
      message: "Password should contain at least 6 characters",
    },
  ];
  const numberOnlyRules = [
    {
      pattern: /^[0-9]+$/,
      required: true,
      message: "Please enter only numbers!"
    }
  ];
  const alphabeticOnlyRules = [
    {
      pattern: /^[A-Za-z]+$/,
      required: true,
      message: "Please enter only alphabets!"
    }
  ];
  return (
    <div className="bg-[#E4DEDE] h-screen w-full flex justify-center items-center relative">
      <div className="w-full h-full overflow-hidden">
        <img src={BG} />
      </div>
      <section
        className="bg-white border border-neutral-300 shadow-[0px_4px_19.5px_0px_rgba(0,0,0,0.25)] 
      rounded-[5px] border-solid w-[65%] h-[70%] absolute flex justify-evenly items-center"
      >
        <section className="flex flex-col items-center justify-center gap-6">
          <div className="flex w-[100%]">
            <Logo />
          </div>
          <Form layout="vertical" onFinish={onFinish}>
            <div className="flex gap-4">
              <Form.Item
                label="Employee Name"
                name="employeeName"
                rules={alphabeticOnlyRules}
                className="w-full text-black text-base font-semibold"
              >
                <Input
                  placeholder="Employee Name"
                  className="shadow-[0px_2px_10px_0px_rgba(96,96,96,0.14)]"
                />
              </Form.Item>

              <Form.Item
                label="Employee ID"
                name={"employeeID"}
                rules={numberOnlyRules}
                className="w-full text-black text-base font-semibold"
              >
                <Input
                  placeholder="Employee Id"
                  className="shadow-[0px_2px_10px_0px_rgba(96,96,96,0.14)]"
                />
              </Form.Item>
            </div>

            <Form.Item
              name={"email"}
              label="Enter Email ID"
              rules={emailRules}
              className="w-full text-black text-base font-semibold"
            >
              <Input
                placeholder="Enter Email ID"
                className="shadow-[0px_2px_10px_0px_rgba(96,96,96,0.14)] w-[300px]"
              />
            </Form.Item>

            <Form.Item
              label="Department"
              name={"department"}
              rules={[
                {
                  required: true,
                  message: "Please enter department!"
                }
              ]}
              className="w-full text-black text-base font-semibold"
            >
              <Select
                placeholder="Department"
                className="shadow-[0px_2px_10px_0px_rgba(96,96,96,0.14)]"
              >
                {departments?.map((data: any) => (
                  <Select.Option value={data.id}>{data.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name={"password"}
              label="Choose Password"
              rules={passwordRules}
              className="w-full text-black text-base font-semibold"
            >
              <Input
                placeholder="Choose Password"
                className="shadow-[0px_2px_10px_0px_rgba(96,96,96,0.14)]"
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="bg-[#7700C7] w-full justify-center py-4 flex items-center text-white text-base font-semibold"
              >
                Register
              </Button>
            </Form.Item>
            <div className="flex justify-center items-center ">
              <p className="text-lg">Already have an account ?</p>
              <Link
                to="/login"
                className="text-[#414141] text-lg font-medium"
                type="text"
              >
                <span className="text-[#7700C7] text-lg leading-10 underline ml-2">
                  Log In
                </span>
              </Link>
            </div>
          </Form>
        </section>
        <span className="w-[1px] h-[80%] flex items-center justify-center bg-[#989898]"></span>
        <img src={RegisterImage} />
      </section>
    </div>
  );
};

export default RegisterPage;
