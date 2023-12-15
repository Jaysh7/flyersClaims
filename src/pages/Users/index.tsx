/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dropdown, Menu, Table } from "antd";
import Header from "../../components/header";
import { DownOutlined } from "@ant-design/icons";
const UsersPage = () => {
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
      title: "Department",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Role",
      key: "role",
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">TeamLead</Menu.Item>
              <Menu.Item key="2">Finance</Menu.Item>
              <Menu.Item key="3">Employee</Menu.Item>
            </Menu>
          }
        >
          <Button>
            Roles <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "test3432",
      address: "1000",
      id: 12333,
    },
    {
      key: "2",
      name: "rmkw",
      address: "1000",
      id: 12333,
    },
    {
      key: "3",
      name: "frontend",
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
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="px-7">
        <div className="mt-10">
          <span className="text-2xl text-[#7700C7]">Users</span>
          <div className="mt-7">
            <Table columns={columns} dataSource={data} />\
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
