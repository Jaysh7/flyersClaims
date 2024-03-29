/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import { UploadIcon } from "../../assets/icons";
import { addClaim } from "../../services/firebase/database.firebase";
import { useAuth } from "../../zustand/auth.slice";
import { ClaimStatus } from "../../enums";
import FileTypeIcon from "../FileTypeIcon";

const { TextArea } = Input;

const ApplyReimbursement = ({
  onSuccess,
  onError
}: {
  onError: any;
  onSuccess: any;
}) => {
  const authSlice: any = useAuth();
  const [file, setFile] = useState<any>();

  const onFinish = async (data: any) => {
    try {
      await addClaim(
        {
          ...data,
          status: ClaimStatus.PENDING,
          employee: authSlice?.data?.uid,
          employeeName: authSlice?.data?.name
        },
        authSlice?.data?.uid
      );
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (onError) {
        onError();
      }
    }
  };
  const fileSelectHandler = (event: any) => {
    setFile(event.file);
  };
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
    <Form style={{ maxWidth: 600 }} layout="vertical" onFinish={onFinish}>
      <section className="flex justify-between gap-10">
        <Form.Item
          label="Title"
          rules={alphabeticOnlyRules}
          name={"title"}
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
          name={"lead"}
          className="w-full text-black text-base font-semibold"
        >
          <Select>
            {authSlice?.users?.map(
              (data: any) =>
                data?.isLead === true &&
                authSlice.data?.uid !== data?.uid && (
                  <Select.Option key={data?.uid} value={data?.uid}>
                    {data?.name}
                  </Select.Option>
                )
            )}
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
            <Select.Option value="Accommodation">Accommodation</Select.Option>
            <Select.Option value="Internet">Internet</Select.Option>
            <Select.Option value="Mobile">Mobile</Select.Option>
            <Select.Option value="Subsriptions">Subsriptions</Select.Option>
            <Select.Option value="Travel">Travel</Select.Option>
            <Select.Option value="Miscellaneous">Miscellaneous</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Claim Amount"
          name={"amount"}
          rules={numberOnlyRules}
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
        required={true}
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
            <span className="text-sm not-italic font-medium">{file.name}</span>
          </div>
        ) : (
          <Upload
            accept=".pdf,.jpeg,.jpg,.png"
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={() => {
              return true;
              // if (
              //   !["pdf", "jpg", "png", "jpeg"].includes(
              //     getFileExtension(file.name)
              //   )
              // ) {
              //   message.error(`Please upload a pdf or image file`);
              //   return false;
              // } else {
              //   fileSelectHandler(file);
              //   return true;
              // }
            }}
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
  );
};

export default ApplyReimbursement;
