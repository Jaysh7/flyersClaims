/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "../../components/header";
import { Table, Tag } from "antd";
import Button from "../../components/button";
import { AddIcon } from "../../assets/icons";
import { useState } from "react";
import ApplyReimbursement from "../../components/ApplyReimbursement";
import ApprovalRequest from "../../components/ApprovalRequest";
import ModalComponent from "../../components/Modal";

const Claims = () => {
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
      render: (text: any, rowdata: any) => (
        <a
          onClick={() => {
            setOpenBill({ state: true, billdata: rowdata });
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Claim number",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Date of Submission",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Claiming amount",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      key: "tags",
      dataIndex: "tags",
      render: (_: any, { tags }: any) => (
        <>
          {tags.map((tag: any) => {
            let color = "yellow";
            if (tag === "Rejected") {
              color = "volcano";
            } else if (tag === "Approved by team lead") {
              color = "blue";
            } else if (tag === "Approved by finance") {
              color = "green";
            } else if (tag === "Pending") {
              color = "yellow";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "1000",
      tags: ["Rejected"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "1000",
      tags: ["Approved by team lead"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "1000",
      tags: ["Approved by finance"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "1000",
      tags: ["Pending"],
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
              children={<ApprovalRequest />}
            />
          )}
        </div>
        <div className="mt-10">
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </div>
  );
};

export default Claims;
