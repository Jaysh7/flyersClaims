/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "../../components/header";
import { Table, Tag } from "antd";
import Button from "../../components/button";
import { AddIcon } from "../../assets/icons";
import { useState } from "react";
import ApplyReimbursement from "../../components/ApplyReimbursement";
import ApprovalRequest from "../../components/ApprovalRequest";
import { useClaims } from "../../zustand/claims.slice";
import { ClaimStatus } from "../../enums";
import ModalComponent from "../../components/Modal";

const Claims = () => {
  const claimsSlice: any = useClaims();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openBill, setOpenBill] = useState<any>({
    state: false,
    billData: null,
  });
  const showModal = () => {
    setIsModalOpen(true);
    setOpenBill(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setOpenBill(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenBill(false);
  };
  const columns = [
    {
      title: "Reimbursement type",
      dataIndex: "name",
      key: "name",
      render: (text: any, rowData: any) => (
        <a
          onClick={() => {
            setOpenBill({ state: true, billData: rowData });
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Claim number",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date of Submission",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Claiming amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_: any, { status }: any) => (
        <>
          {(() => {
            let color = "yellow";
            if (status === ClaimStatus.REJECTED) {
              color = "volcano";
            } else if (status === ClaimStatus.APPROVE_BY_LEAD) {
              color = "blue";
            } else if (status === ClaimStatus.APPROVED_BY_FINANCE_OR_HR) {
              color = "green";
            } else if (status === ClaimStatus.PENDING) {
              color = "yellow";
            }
            return (
              <Tag color={color} key={status}>
                {status?.toUpperCase()}
              </Tag>
            );
          })()}
        </>
      ),
    },
  ];

  return (
    <div>
      <Header />
      <div className="px-7">
        <div className="mt-10 flex justify-between">
          <Button
            variant="secondary"
            children={"My claims"}
            className="px-8 py-2"
          />

          <Button
            className="px-8 py-2 cursor-pointer"
            onClick={showModal}
            variant="primary"
            leftIcon={<AddIcon fill={"white"} className="w-4 h-4" />}
            children={"Add your claim"}
          />
          {isModalOpen && (
            <ModalComponent
              footerVisible={null}
              modalTitle={"Apply Reimbursement"}
              modalOpen={isModalOpen}
              onOk={handleOk}
              onClose={handleCancel}
              children={<ApplyReimbursement />}
            />
          )}
          {openBill.state && (
            <ModalComponent
              footerVisible={null}
              modalTitle={"Approval Request"}
              modalOpen={openBill.state}
              onOk={handleOk}
              onClose={handleCancel}
              children={<ApprovalRequest data={openBill.billData} />}
            />
          )}
        </div>
        <div className="mt-10">
          <Table columns={columns} dataSource={claimsSlice.data} />
        </div>
      </div>
    </div>
  );
};

export default Claims;
