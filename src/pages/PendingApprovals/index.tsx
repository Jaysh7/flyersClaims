/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "../../components/header";
import { Table, Tabs, Tag } from "antd";
import Button from "../../components/button";
import { AddIcon } from "../../assets/icons";
import { useState } from "react";
import ModalComponent from "../../components/Modal";
import ApplyReimbursement from "../../components/ApplyReimbursement";
import ApprovalRequest from "../../components/ApprovalRequest";
import { useClaims } from "../../zustand/claims.slice";
import { ClaimStatus } from "../../enums";

const PendingApprovals = () => {
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

  const PendingApprovalsColumns = [
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
      title: "Employee Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Reimbursement Type",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Submission date",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Claiming amount",
      dataIndex: "address",
      key: "address",
    },
  ];
  const PendingApprovalsData = [
    {
      key: "1",
      name: "John Brown",
      address: "1000",
      id: 12333,
    },
    {
      key: "2",
      name: "Jim Green",
      address: "1000",
      id: 12333,
    },
    {
      key: "3",
      name: "Joe Black",
      address: "1000",
      id: 12333,
    },
    {
      key: "3",
      name: "Joe Black",
      address: "1000",
      id: 12333,
    },
  ];
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
        <>
          <div className="flex gap-3 justify-end mt-5">
            <Button
              className="px-8 py-3 gap-3 flex items-center cursor-pointer text-base font-semibold"
              onClick={showModal}
              variant="primary"
              leftIcon={
                <AddIcon fill={"white"} className="w-5 h-5 mt-[-5px]" />
              }
              children={"Add your claim"}
            />
          </div>
          <Tabs
            // defaultActiveKey="tab1"
            type="line"
            // onEdit={({ e, action }: any) => {
            //   console.log(e, action);
            // }}
          >
            <Tabs.TabPane tab=" My claims" key=" My claims">
              <Table columns={columns} dataSource={claimsSlice.data} />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Pending approvals" key=" Pending approvals">
              <Table
                columns={PendingApprovalsColumns}
                dataSource={PendingApprovalsData}
              />{" "}
            </Tabs.TabPane>
          </Tabs>
        </>
      </div>
    </div>
  );
};

export default PendingApprovals;
