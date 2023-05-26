import { Table, Spin, Avatar, Pagination, Space } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const UserTable = () => {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalQty, setTotalQty] = useState(0); // 新增總頁數的狀態變數

  useEffect(() => {
    getUsers();
    console.log("user", userData);
  }, []);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatarUrl) => (
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          {avatarUrl ? (
            <Avatar size={64} src={avatarUrl} />
          ) : (
            <Avatar size={64} src="https://imgur.com/QV2Rk8f.jpg" />
          )}
        </div>
      )
    },
    {
      title: "會員ID",
      dataIndex: "user_id",
      key: "user_id",
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
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/admin/user_list?per_page=${perPage}&page=${page}`
      )
      .then((res) => {
        console.log(res);
        // const data = res.data.users.map((user, index) => {
        //   return {
        //     key: user.user_id,
        //     userId: user.user_id,
        //     username: user.username,
        //     email: user.email,
        //     avatar: user.avatar ? user.avatar : "https://imgur.com/QV2Rk8f.jpg",
        //     gender: user.gender,
        //     age: calculateAge(user.birthday),
        //     phone: user.phone,
        //     address: user.address
        //   };
        // });
        setUserData(res.data.users);
        // 更新總頁數的狀態
        setTotalQty(res.data.user_qty);
        setPerPage(res.data.paginations.per_page);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const pageChange = (newPage) => {
    setPage(newPage);
    getUsers(newPage);
    // 在頁碼改變時重新呼叫 getUsers 函式
  };

  return (
    <div>
      {userData.length > 0 ? (
        <>
          <Table
            rowKey="user_id"
            columns={columns}
            dataSource={userData}
            pagination={false}
          />
          <div className="m-3 d-flex justify-content-end">
            <Pagination
              current={page}
              pageSize={perPage}
              total={totalQty}
              onChange={pageChange}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserTable;
