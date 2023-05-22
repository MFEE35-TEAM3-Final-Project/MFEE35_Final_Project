import { Table, Spin, Avatar, Pagination } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const UserTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatarUrl) => (
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Avatar size={64} src={avatarUrl} />
        </div>
      )
    },
    {
      title: "會員ID",
      dataIndex: "userId",
      key: "userId",
      sorter: {
        compare: (a, b) => a.userId - b.userId
      }
    },
    {
      title: "名稱",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      sorter: {
        compare: (a, b) => sortName(a.email, b.email)
      }
    },
    {
      title: "性別",
      dataIndex: "gender",
      key: "gender",
      sorter: {
        compare: (a, b) => a.gender - b.gender
      }
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: {
        compare: (a, b) => a.age - b.age
      }
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

  // function
  const sortName = (a, b) => {
    let nameA = a.toUpperCase();
    let nameB = b.toUpperCase();

    if (nameA < nameB) {
      return -1; // a应该在b之前
    }
    if (nameA > nameB) {
      return 1; // a应该在b之后
    }
    return 0; // 名字相同，顺序不变
  };

  const calculateAge = (birthday) => {
    const birthYear = parseInt(birthday.slice(0, 4));
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    return age;
  };
  const getUsers = (page = 1) => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/admin/user_list?per_page=10&page=${page}`
      )
      .then((res) => {
        console.log(res);
        const data = res.data.users.map((user, index) => {
          return {
            key: user.user_id,
            userId: user.user_id,
            username: user.username,
            email: user.email,
            avatar: "https://imgur.com/4TuQJDn.jpg",
            gender: user.gender,
            age: calculateAge(user.birthday),
            phone: user.phone,
            address: user.address
          };
        });
        setUserData(data);

        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const pageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getUsers(1);
  }, [page]);

  return (
    <div>
      {isLoading ? (
        <Spin tip="Loading..." size="large">
          <div className="p-5" />
        </Spin>
      ) : (
        <Table columns={columns} dataSource={userData} pagination={false} />
      )}
    </div>
  );
};

export default UserTable;
