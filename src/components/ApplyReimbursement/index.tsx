/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import { UploadIcon } from "../../assets/icons";
import { addClaim } from "../../services/firebase/database.firebase";
import { useAuth } from "../../zustand/auth.slice";
import { ClaimStatus } from "../../enums";
import FileTypeIcon from "../FileTypeIcon";

const { TextArea } = Input;

const ApplyReimbursement: React.FC = () => {
  const authSlice: any = useAuth();
  const onFinish = (data: any) => {
    addClaim(
      {
        ...data,
        status: ClaimStatus.PENDING,
      },
      authSlice?.data?.uid
    );
  };
  const [file, setFile] = useState<any>();
  const fileSelectHandler = (event: any) => {
    setFile(event.file);
  };
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
            label="Title"
            name={"title"}
            required={true}
            className="w-full text-black text-base font-semibold"
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="Employee ID"
            required={true}
            name={"employee"}
            className="w-full text-black text-base font-semibold"
          >
            <Input />
          </Form.Item> */}
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
            label="Date"
            name={"date"}
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
            name={"amount"}
            required={true}
            className="w-full text-black text-base font-semibold"
          >
            <Input />
          </Form.Item>
        </section>
        <Form.Item
          className="w-full text-black text-base font-semibold"
          label="Remarks if any"
          name={"description"}
        >
          <TextArea
            value="Type remarks if any"
            className="text-[#989898] text-xs"
          />
        </Form.Item>
        <Form.Item
          label="Bill Attachment"
          name={"attachment"}
          className=" text-black text-base font-semibold"
          required={true}
          // valuePropName="Type remarks if any"
          // getValueFromEvent={normFile}
        >
          {file ? (
            <div className="flex items-center gap-2">
              <FileTypeIcon fileName={file.name} />
              <span className="text-sm not-italic font-medium">
                {file.name}
              </span>
            </div>
          ) : (
            <Upload
              accept="pdf, jpeg"
              beforeUpload={() => {
                /* update state here */ return false;
              }}
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              // beforeUpload={beforeUpload}
              onChange={fileSelectHandler}
            >
              <div>
                <UploadIcon className="h-9 w-9" />
              </div>
            </Upload>
          )}
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
