/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { PdfIcon } from "../../assets/icons";

const ApprovalRequest: React.FC = () => {
  const [openPdf, setOpenPdf] = useState<any>();
  const handleViewPdf = () => {
    setOpenPdf(!openPdf);
  };
  return (
    <>
      {openPdf ? (
        <>
          <section className="fixed top-[5%] right-[15%] left-[10%] h-[80%] w-[80%] ">
            <embed
              src="https://www.africau.edu/images/default/sample.pdf"
              width="auto"
              height="auto"
              type="application/pdf"
              className="w-full h-full"
            />
          </section>
        </>
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
                <Input />
              </Form.Item>
            </section>
            <section className="flex justify-between gap-10">
              <Form.Item
                label="Lead"
                className="w-full text-black text-base font-semibold"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="DatePicker"
                className="w-full text-black text-base font-semibold"
              >
                <Input />
              </Form.Item>
            </section>
            <section className="flex justify-between gap-10">
              <Form.Item
                label="Reimbursement Type"
                className="w-full text-black text-base font-semibold"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Claim Amount"
                className="w-full text-black text-base font-semibold"
              >
                <Input />
              </Form.Item>
            </section>
            <Form.Item
              className="w-full text-black text-base font-semibold"
              label="Remarks if any"
            >
              <Input className="h-[200px]" />
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
                  Sample file.pdf
                </span>
              </div>
            )}
            <div
              // className="flex gap-3 "
              className={`flex gap-3 ${
                openPdf
                  ? "absolute bottom-[-350px] items-center justify-center"
                  : ""
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
        {openPdf ? (
          "null"
        ) : (
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
