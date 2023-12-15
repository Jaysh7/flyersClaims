/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { PdfIcon } from "../../assets/icons";
import { getFileType } from "../../utils/functions";

const ApprovalRequest = ({ data }: { data: any }) => {
  const [openPdf, setOpenPdf] = useState<any>();
  const handleViewPdf = () => {
    setOpenPdf(!openPdf);
  };

  return (
    <>
      {openPdf ? (
        <section className=" !h-[60vh] ">
          <embed
            src={data?.attachment?.downloadUrl}
            width="auto"
            height="auto"
            type={getFileType(data?.attachment?.downloadUrl)}
            className="w-full h-full"
          />
        </section>
      ) : (
        <>
          <Form disabled={false} style={{ maxWidth: 600 }} layout="vertical">
            <section className="flex justify-between gap-10">
              <Form.Item
                label="Employee Name"
                className="w-full text-black text-base font-semibold"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Employee ID"
                className="w-full text-black text-base font-semibold"
              >
                <Input value={data?.data?.employee} readOnly />
              </Form.Item>
            </section>
            <section className="flex justify-between gap-10">
              <Form.Item
                label="Lead"
                className="w-full text-black text-base font-semibold"
              >
                <Input value={data?.data?.lead} readOnly />
              </Form.Item>
              <Form.Item
                label="Date"
                className="w-full text-black text-base font-semibold"
              >
                <Input value={data?.data?.date} readOnly />
              </Form.Item>
            </section>
            <section className="flex justify-between gap-10">
              <Form.Item
                label="Reimbursement Type"
                className="w-full text-black text-base font-semibold"
              >
                <Input value={data?.data?.reimbursementType} readOnly />
              </Form.Item>
              <Form.Item
                label="Claim Amount"
                className="w-full text-black text-base font-semibold"
              >
                <Input value={data?.data?.amount} readOnly />
              </Form.Item>
            </section>
            <Form.Item
              className="w-full text-black text-base font-semibold"
              label="Remarks if any"
            >
              <Input
                value={data?.data?.description}
                readOnly
                className="h-[200px]"
              />
            </Form.Item>
          </Form>
        </>
      )}
      <>
        <div
          className={` p-3 rounded-lg mb-3 relative ${
            openPdf ? "bg-transparent" : "bg-[#EEE] "
          }`}
        >
          <section className="flex justify-between">
            {openPdf ? null : (
              <div className="flex items-center">
                <PdfIcon className="w-8 h-8" />
                <span className="text-sm not-italic font-medium">
                  {data.attachment.name}
                </span>
              </div>
            )}
            <div
              // className="flex gap-3 "
              className={`flex gap-3 ${
                openPdf ? " hidden items-center justify-center" : ""
              }`}
            >
              <Button
                onClick={handleViewPdf}
                className="border-transparent text-[rgba(119,0,199,1)]  text-base font-semibold   flex items-center"
              >
                {openPdf ? "Close" : "View"}
              </Button>

              <Button
                className="border-transparent text-[rgba(119,0,199,1)]  text-base font-semibold
           flex items-center"
              >
                Download
              </Button>
            </div>
          </section>
        </div>
      </>
      <section className="flex gap-4 justify-center items-center">
        {openPdf ? null : (
          <>
            <Button
              className="border-[rgba(119,0,199,1)] border-2 text-[rgba(119,0,199,1)] bg-[#E0C9EF] text-base
           font-normal flex items-center"
            >
              Reject
            </Button>
            <Button className="bg-[rgba(119,0,199,1)] text-white text-base font-normal flex items-center">
              Approve
            </Button>
          </>
        )}
      </section>
    </>
  );
};

export default ApprovalRequest;
