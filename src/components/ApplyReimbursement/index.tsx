/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import { UploadIcon } from "../../assets/icons";

const { TextArea } = Input;

const ApplyReimbursement: React.FC = () => {
  const [claims, setClaims] = useState<any>([]);
  const onFinish = (data: any) => {
    setClaims(data);
  };
  console.log(claims, "data");
  return (
    <>
      <Form
        disabled={false}
        style={{ maxWidth: 600 }}
        layout="vertical"
        onFinish={onFinish}
      >
        <section className="flex justify-between gap-10">
          <Form.Item
            label="Employee Name"
            name={"EmployeeName"}
            required={true}
            className="w-full text-black text-base font-semibold"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Employee ID"
            required={true}
            name={"EmployeeID"}
            className="w-full text-black text-base font-semibold"
          >
            <Input />
          </Form.Item>
        </section>
        <section className="flex justify-between gap-10">
          <Form.Item
            label="Lead"
            required={true}
            name={"lead"}
            className="w-full text-black text-base font-semibold"
          >
            <Select>
              <Select.Option value="demo">Thamodharan</Select.Option>
              <Select.Option value="demo">Priyanka</Select.Option>
              <Select.Option value="demo">Ananthu</Select.Option>
              <Select.Option value="demo">Gopinath</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="DatePicker"
            name={"datepicker"}
            required={true}
            className="w-full text-black text-base font-semibold"
          >
            <DatePicker className="h-8 w-full" />
          </Form.Item>
        </section>
        <section className="flex justify-between gap-10">
          <Form.Item
            label="Reimbursement Type"
            name={"reimbursementType"}
            required={true}
            className="w-full text-black text-base font-semibold"
          >
            <Select>
              <Select.Option value="demo">Accommodation</Select.Option>
              <Select.Option value="demo">Internet</Select.Option>
              <Select.Option value="demo">Mobile</Select.Option>
              <Select.Option value="demo">Subsriptions</Select.Option>
              <Select.Option value="demo">Travel</Select.Option>
              <Select.Option value="demo">Miscellaneous</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Claim Amount"
            name={"claimAmount"}
            required={true}
            className="w-full text-black text-base font-semibold"
          >
            <Input />
          </Form.Item>
        </section>
        <Form.Item
          className="w-full text-black text-base font-semibold"
          label="Remarks if any"
          name={"remarks"}
        >
          <TextArea
            value="Type remarks if any"
            className="text-[#989898] text-xs"
          />
        </Form.Item>
        <Form.Item
          label="Bill Attachment"
          name={"bill"}
          className=" text-black text-base font-semibold"
          required={true}
          // valuePropName="Type remarks if any"
          // getValueFromEvent={normFile}
        >
          <Upload
            beforeUpload={() => {
              /* update state here */ return false;
            }}
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // beforeUpload={beforeUpload}
            // onChange={handleChange}
          >
            <div>
              <UploadIcon className="h-9 w-9" />
            </div>
          </Upload>
        </Form.Item>
        <section className="flex justify-center items-center">
          <Button
            type="primary"
            className="w-full bg-[#7700C7]"
            htmlType="submit"
          >
            Submit
          </Button>
        </section>
        {/* <Form.Item></Form.Item> */}
      </Form>
    </>
  );
};

export default ApplyReimbursement;
