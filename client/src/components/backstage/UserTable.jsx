import { Table } from "antd";
const UserTable = () => {
  // function
  const calculateAge = (birthday) => {
    const birthYear = parseInt(birthday.slice(0, 4));
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    return age;
  };
  const columns = [
    {
      title: "會員ID",
      dataIndex: "userId",
      key: "userId"
    },
    {
      title: "名稱",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "性別",
      dataIndex: "gender",
      key: "gender"
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "電話",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address"
    }
  ];

  const data = [
    {
      key: "1",
      userId: "6818255871",
      username: "test2",
      email: "AAAAAAAeeeel@gmail.com",

      gender: "female",
      age: calculateAge("1995-05-19T16:00:00.000Z"),
      phone: "654065465",
      address: "London No. 1 Lake Park"
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park"
    },

    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park"
    }
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default UserTable;
