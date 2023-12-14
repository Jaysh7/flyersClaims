import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import { UploadIcon } from "../../assets/icons";

const { TextArea } = Input;

const ApplyReimbursement: React.FC = () => {
  return (
    <>
      <Form disabled={false} style={{ maxWidth: 600 }} layout="vertical">
        <section className="flex justify-between gap-10">
          <Form.Item
            label="Employee Name"
            required={true}
            className="w-full text-black text-base font-semibold"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Employee ID"
            required={true}
            className="w-full text-black text-base font-semibold"
          >
            <Input />
          </Form.Item>
        </section>
        <section className="flex justify-between gap-10">
          <Form.Item
            label="Lead"
            required={true}
            className="w-full text-black text-base font-semibold"
          >
            <Select>
              <Select.Option value="demo">Sujai</Select.Option>
              <Select.Option value="demo">Subas</Select.Option>
              <Select.Option value="demo">Afroz</Select.Option>
              <Select.Option value="demo">Chandran</Select.Option>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="DatePicker"
            required={true}
            className="w-full text-black text-base font-semibold"
          >
            <DatePicker className="h-8 w-full" />
          </Form.Item>
        </section>
        <section className="flex justify-between gap-10">
          <Form.Item
            label="Reimbursement Type"
            required={true}
            className="w-full text-black text-base font-semibold"
          >
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Claim Amount"
            required={true}
            className="w-full text-black text-base font-semibold"
          >
            <Input />
          </Form.Item>
        </section>
        <Form.Item
          className="w-full text-black text-base font-semibold"
          label="Remarks if any"
        >
          <TextArea
            value="Type remarks if any"
            className="text-[#989898] text-xs"
          />
        </Form.Item>
        <Form.Item
          label="Bill Attachment"
          className=" text-black text-base font-semibold"
          required={true}
          // valuePropName="Type remarks if any"
          // getValueFromEvent={normFile}
        >
          <Upload
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
          <Button className="bg-[rgba(119,0,199,1)] text-white text-base font-normal flex items-center">
            Submit
          </Button>
        </section>
        {/* <Form.Item></Form.Item> */}
      </Form>
    </>
  );
};

export default () => <ApplyReimbursement />;