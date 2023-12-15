/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { getFileType } from "../../utils/functions";
import FileTypeIcon from "../FileTypeIcon";
import { useAuth } from "../../zustand/auth.slice";
import { approveClaim } from "../../services/firebase/database.firebase";
import { ClaimStatus } from "../../enums";

const ApprovalRequest = ({
  data,
  onApproveHandler,
  onRejectHandler,
  onError
}: {
  data: any;
  onApproveHandler: any;
  onRejectHandler: any;
  onError: any;
}) => {
  const authSlice: any = useAuth();
  const [openPdf, setOpenPdf] = useState<any>();
  const handleViewPdf = () => {
    setOpenPdf(!openPdf);
  };
  const getLead = (id: string) => {
    return authSlice.users?.find((data: any) => data?.uid === id);
  };

  const onApprove = () => {
    try {
      if (authSlice?.data?.isLead) {
        approveClaim({
          ...data,
          status: ClaimStatus.APPROVE_BY_LEAD
        });
      }
      if (authSlice?.data?.isFinanceAdmin) {
        approveClaim({
          ...data,
          status: ClaimStatus.APPROVED_BY_FINANCE_OR_HR
        });
      }
      onApproveHandler();
    } catch (error) {
      onError();
    }
  };

  const onReject = () => {
    try {
      if (authSlice?.data?.isLead) {
        approveClaim({
          ...data,
          status: ClaimStatus.REJECTED
        });
      }
      if (authSlice?.data?.isFinanceAdmin) {
        approveClaim({
          ...data,
          status: ClaimStatus.REJECTED
        });
      }
      onRejectHandler();
    } catch (error) {
      onError();
    }
  };
  function downloadClaimAttachment() {
    const link = document.createElement("a");
    // If you don't know the name or want to use
    // the webserver default set name = ''
    link.setAttribute("download", data?.attachment?.name);
    link.href = data?.attachment?.downloadUrl;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  return (
    <>
      {openPdf ? (
        <section className=" !h-[60vh] ">
          <embed
            src={data?.attachment?.downloadUrl}
            type={getFileType(data?.attachment?.name)}
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
                <Input value={data?.employeeName} readOnly />
              </Form.Item>
              <Form.Item
                label="Employee ID"
                className="w-full text-black text-base font-semibold"
              >
                <Input value={data?.employee} readOnly />
              </Form.Item>
            </section>
            <section className="flex justify-between gap-10">
              <Form.Item
                label="Lead"
                className="w-full text-black text-base font-semibold"
              >
                <Input value={getLead(data?.lead)?.name} readOnly />
              </Form.Item>
              <Form.Item
                label="Date"
                className="w-full text-black text-base font-semibold"
              >
                <Input value={data?.date} readOnly />
              </Form.Item>
            </section>
            <section className="flex justify-between gap-10">
              <Form.Item
                label="Reimbursement Type"
                className="w-full text-black text-base font-semibold"
              >
                <Input value={data?.reimbursementType} readOnly />
              </Form.Item>
              <Form.Item
                label="Claim Amount"
                className="w-full text-black text-base font-semibold"
              >
                <Input value={data?.amount} readOnly />
              </Form.Item>
            </section>
            <Form.Item
              className="w-full text-black text-base font-semibold"
              label="Remarks if any"
            >
              <Input value={data?.description} readOnly className="h-[200px]" />
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
                <FileTypeIcon fileName={data.attachment.name} />
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
                onClick={downloadClaimAttachment}
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
        {authSlice?.data?.uid !== data?.employee &&
        data?.status !== ClaimStatus.REJECTED ? (
          <>
            <Button
              className="border-[rgba(119,0,199,1)] border-2 text-[rgba(119,0,199,1)] bg-[#E0C9EF] text-base
           font-normal flex items-center"
              onClick={onReject}
            >
              Reject
            </Button>
            <Button
              className="bg-[rgba(119,0,199,1)] text-white text-base font-normal flex items-center"
              onClick={onApprove}
            >
              Approve
            </Button>
          </>
        ) : null}
      </section>
    </>
  );
};

export default ApprovalRequest;
