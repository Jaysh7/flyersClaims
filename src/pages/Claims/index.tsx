import Header from "../../components/header";
import { Table, Tag } from "antd";
import Button from "../../components/button";
import { AddIcon } from "../../assets/icons";

const Claims = () => {
  const columns = [
    {
      title: "Reimbursement type",
      dataIndex: "name",
      key: "name",
      render: (text: any) => <a>{text}</a>,
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
      <div>
        <Header />
      </div>
      <div className="px-7">
        <div className="mt-10 flex justify-between">
          <Button
            variant="secondary"
            children={"My claims"}
            className="px-8 py-2"
          />
          <Button
            className="px-8 py-2"
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

export default Claims;
