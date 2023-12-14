import { Link } from "react-router-dom";
import { BG, RegisterImage } from "../../assets/images";
import { Button, Form, Input, Select } from "antd";
import { FlyLogo } from "../../assets/icons";

const RegisterPage = () => {
  return (
    <div className="bg-[#E4DEDE] h-screen w-full flex justify-center items-center relative">
      <div className="w-full h-full overflow-hidden">
        <img src={BG} />
      </div>
      <section
        className="bg-white border border-neutral-300 shadow-[0px_4px_19.5px_0px_rgba(0,0,0,0.25)] 
      rounded-[5px] border-solid w-[65%] h-[70%] absolute flex justify-evenly items-center"
      >
        <section className="flex flex-col items-center justify-center">
          <section className="flex items-center gap-5 ">
            <FlyLogo className="w-[100px] h-[100px] " />
            <div className="flex flex-col">
              <p className="text-[#2A2828] text-xl italic font-bold">
                Flyer’s Claims
              </p>
              <p className="text-[#414141] text-lg not-italic font-normal">
                Corporate Reimbursement Management
              </p>
            </div>
          </section>
          <Form layout="vertical">
            <div className="flex gap-4">
              <Form.Item
                label="Employee Name"
                required={true}
                className="w-full text-black text-base font-semibold"
              >
                <Input
                  placeholder="Employee Name"
                  className="shadow-[0px_2px_10px_0px_rgba(96,96,96,0.14)]"
                />
              </Form.Item>

              <Form.Item
                label="Employee ID"
                required={true}
                className="w-full text-black text-base font-semibold"
              >
                <Input
                  placeholder="Employee Id"
                  className="shadow-[0px_2px_10px_0px_rgba(96,96,96,0.14)]"
                />
              </Form.Item>
            </div>

            <Form.Item
              label="Enter Email ID"
              required={true}
              className="w-full text-black text-base font-semibold"
            >
              <Input
                placeholder="Enter Email ID"
                className="shadow-[0px_2px_10px_0px_rgba(96,96,96,0.14)] w-[300px]"
              />
            </Form.Item>

            <Form.Item
              label="Department"
              required={true}
              className="w-full text-black text-base font-semibold"
            >
              <Select
                placeholder="Department"
                className="shadow-[0px_2px_10px_0px_rgba(96,96,96,0.14)]"
              >
                <Select.Option value="demo">Sujai</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Choose Password"
              required={true}
              className="w-full text-black text-base font-semibold"
            >
              <Input
                placeholder="Choose Password"
                className="shadow-[0px_2px_10px_0px_rgba(96,96,96,0.14)]"
              />
            </Form.Item>

            <Button className="bg-[#7700C7] w-full justify-center py-4 flex items-center text-white text-base font-semibold">
              Register
            </Button>
            <div className="flex justify-center ">
              <Link
                to="/login"
                className="text-[#414141] text-lg font-medium"
                type="text"
              >
                Already have an account ?
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
