/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dropdown, Menu, Table } from "antd";
import Header from "../../components/header";
import { DownOutlined } from "@ant-design/icons";
import { useAuth } from "../../zustand/auth.slice";
import { updateUserRole } from "../../services/firebase/database.firebase";
const UsersPage = () => {
  const authSlice: any = useAuth();
  const columns = [
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
      render: (text: any) => <a>{text}</a>
    },
    {
      title: "Employee Id",
      dataIndex: "employee",
      key: "employee"
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department"
    },
    {
      title: "Role",
      key: "role",
      render: (data: any) => {
        return (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="1"
                  onClick={async () => {
                    await updateUserRole({
                      uid: data?.uid,
                      isLead: true,
                      isFinanceAdmin: false
                    });
                  }}
                >
                  TeamLead
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={async () => {
                    await updateUserRole({
                      uid: data?.uid,
                      isLead: false,
                      isFinanceAdmin: false
                    });
                  }}
                >
                  Finance
                </Menu.Item>
                <Menu.Item
                  key="3"
                  onClick={async () => {
                    await updateUserRole({
                      uid: data?.uid,
                      isLead: false,
                      isFinanceAdmin: false
                    });
                  }}
                >
                  Employee
                </Menu.Item>
              </Menu>
            }
          >
            <Button>
              {data?.isLead
                ? "TeamLead"
                : data?.isFinanceAdmin
                ? "Finance admin"
                : "employee"}{" "}
              <DownOutlined />
            </Button>
          </Dropdown>
        );
      }
    }
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
            <Table columns={columns} dataSource={authSlice.users} />\
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
