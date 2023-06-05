import {
  FileTextOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  PercentageOutlined,
  ReadOutlined,
  CoffeeOutlined,
  GiftOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, Avatar, Table, Pagination } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import logoImg from "../../image/logo-black.png";
import logoImgSmall from "../../image/tokei2.ico";
// import UserTable from "../../components/backstage/UserTable";
import OrderTable from "../../components/backstage/OrderTable";
import ArticleTable from "../../components/backstage/ArticleTable";
import CouponTable from "../../components/backstage/CouponTable";
import FoodTable from "../../components/backstage/FoodTable";
import ProductTable from "../../components/backstage/ProductTable";
import AdminCard from "../../components/backstage/AdminCard";

const Backstage = () => {
  const navigate = useNavigate();
  const { Header, Sider, Content } = Layout;

  // 左側列表
  const items = [
    {
      key: "user",
      icon: <UserOutlined />,
      label: "會員管理"
    },
    {
      key: "order",
      icon: <FileTextOutlined />,
      label: "訂單管理"
    },
    {
      key: "coupon",
      icon: <PercentageOutlined />,
      label: "優惠券管理"
    },
    {
      key: "article",
      icon: <ReadOutlined />,
      label: "文章管理"
    },
    {
      key: "food",
      icon: <CoffeeOutlined />,
      label: "食材管理"
    },
    {
      key: "product",
      icon: <GiftOutlined />,
      label: "產品管理"
    }
  ];

  // data
  const [collapsed, setCollapsed] = useState(false);
  const [siderSelected, setSiderSelected] = useState("user");

  // user table data
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalQty, setTotalQty] = useState(0); // 新增總頁數的狀態變數
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
      key: "user_id"
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
        compare: (a, b) => {
          const genderA = a.gender;
          const genderB = b.gender;
          return genderA.localeCompare(genderB);
        }
      }
    },
    {
      title: "Age",
      dataIndex: "birthday",
      key: "age",
      render: (b) => {
        return calculateAge(b);
      },
      sorter: {
        compare: (a, b) => {
          const ageA = calculateAge(a.birthday);
          const ageB = calculateAge(b.birthday);
          return ageA - ageB;
        }
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
  const selectedItem = (e) => {
    setSiderSelected(e.key);
  };

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
    const jwtToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwtToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = jwtToken;
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/admin/user_list?per_page=${perPage}&page=${page}`
      )
      .then((res) => {
        console.log(res);
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

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div id="backstage">
      <Layout>
        <Sider className="sider" trigger={null} collapsed={collapsed}>
          <div className="logo justify-content-center d-flex p-1">
            <a href="/">
              {collapsed ? (
                <img className="pt-2" src={logoImgSmall} alt="" />
              ) : (
                <img style={{ maxHeight: "90%" }} src={logoImg} alt="" />
              )}
            </a>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[siderSelected]}
            items={items}
            onClick={(e) => {
              selectedItem(e);
            }}
          />
        </Sider>
        <Layout>
          <Header
            className="header w-100 d-flex"
            style={{
              padding: 0,
              background: "#e4dcd1"
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                backgroundColor: "#e4dcd1"
              }}
            />

            <div className="ms-auto me-5">
              <AdminCard />
            </div>
          </Header>
          <Content
            style={{
              padding: 24,
              minHeight: 800
            }}
          >
            {/* {siderSelected === "user" && <UserTable />} */}
            {siderSelected === "coupon" && <CouponTable />}
            {siderSelected === "order" && <OrderTable />}
            {siderSelected === "article" && <ArticleTable />}
            {siderSelected === "food" && <FoodTable />}
            {siderSelected === "product" && <ProductTable />}

            {/* default */}
            {siderSelected === "user" && userData && (
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
            )}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default Backstage;
