/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddIcon } from "../../assets/icons";
import { ClaimStatus } from "../../enums";
import { Table, Tabs, Tag, message } from "antd";
import { useState } from "react";
import { useClaims } from "../../zustand/claims.slice";
import { useAuth } from "../../zustand/auth.slice";
import ApplyReimbursement from "../../components/ApplyReimbursement";
import ApprovalRequest from "../../components/ApprovalRequest";
import Button from "../../components/button";
import Header from "../../components/header";
import ModalComponent from "../../components/Modal/index";

const Claims = () => {
  const claimsSlice: any = useClaims();
  const authSlice: any = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openBill, setOpenBill] = useState<any>({
    state: false,
    billData: null
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

  const pendingApprovalColumn = [
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      render: (text: any, rowData: any) => (
        <a
          onClick={() => {
            setOpenBill({ state: true, billData: rowData });
          }}
        >
          {text}
        </a>
      )
    },
    {
      title: "Employee Id",
      dataIndex: "employee",
      key: "employee"
    },
    {
      title: "Reimbursement Type",
      dataIndex: "reimbursementType",
      key: "reimbursementType"
    },
    {
      title: "Submission date",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "Claiming amount",
      dataIndex: "amount",
      key: "amount"
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
      )
    }
  ];

  const claims = [
    {
      title: "Reimbursement type",
      dataIndex: "reimbursementType",
      key: "reimbursementType",
      render: (text: any, rowData: any) => (
        <a
          onClick={() => {
            setOpenBill({ state: true, billData: rowData });
          }}
        >
          {text}
        </a>
      )
    },
    {
      title: "Claim number",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Date of Submission",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "Claiming amount",
      dataIndex: "amount",
      key: "amount"
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
      )
    }
  ];

  return (
    <div>
      <Header />
      <div className="px-7">
        <div className="mt-10 flex justify-between">
          <div className="flex gap-3"></div>
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
              children={
                <ApprovalRequest
                  onApproveHandler={() => {}}
                  onRejectHandler={() => {
                    message.success("Claim rejected successfully");
                  }}
                  onError={() => {}}
                  data={openBill.billData}
                />
              }
            />
          )}
        </div>
        <div className="mt-10">
          {authSlice?.data?.isLead === true ||
          authSlice?.data?.isFinanceAdmin ? (
            <>
              <Tabs type="line">
                <Tabs.TabPane tab=" My claims" key=" My claims">
                  <Table
                    columns={claims}
                    dataSource={claimsSlice.data?.filter(
                      (data: any) => data?.employee === authSlice.data?.uid
                    )}
                  />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Pending approvals" key=" Pending approvals">
                  <Table
                    columns={pendingApprovalColumn}
                    dataSource={claimsSlice.data?.filter((data: any) =>
                      authSlice.data?.isFinanceAdmin
                        ? data?.status === ClaimStatus.APPROVE_BY_LEAD
                        : data?.lead === authSlice.data?.uid
                    )}
                  />
                </Tabs.TabPane>
              </Tabs>
            </>
          ) : (
            <>
              <Tabs type="line">
                <Tabs.TabPane tab=" My claims" key=" My claims">
                  <Table
                    columns={claims}
                    dataSource={claimsSlice.data?.filter(
                      (data: any) => data?.employee === authSlice?.data?.uid
                    )}
                  />
                </Tabs.TabPane>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Claims;
