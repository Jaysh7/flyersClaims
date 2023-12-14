import Header from "../../components/header";
import { Table } from "antd";
import Button from "../../components/button";
import { AddIcon } from "../../assets/icons";

const PendingApprovals = () => {
  const columns = [
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
      render: (text: any) => <a>{text}</a>,
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
  const data = [
    {
      key: "1",
      name: "John Brown",
      address: "1000",
      id: 12333
    },
    {
      key: "2",
      name: "Jim Green",
      address: "1000",
      id: 12333
    },
    {
      key: "3",
      name: "Joe Black",
      address: "1000",
      id: 12333
    },
    {
      key: "3",
      name: "Joe Black",
      address: "1000",
      id: 12333
    },
  ];
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="px-7">
        <div className="mt-10 flex justify-between">
          <div className="flex gap-3">
            <Button
              variant="secondary"
              children={"My claims"}
              className="px-8 py-2"
            />
            <Button
              className="px-8 py-2"
              variant="primary"
              children={"Pending approvals"}
            />
          </div>
          <Button
            className="px-8 py-3"
            variant="primary"
            leftIcon={<AddIcon fill={"white"} className="w-4 h-4" />}
            children={"Add your claim"}
          />
        </div>
        <div className="mt-10">
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </div>
  );
};

export default PendingApprovals;
