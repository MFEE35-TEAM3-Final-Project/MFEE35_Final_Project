import {
  FileTextOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  ExperimentOutlined,
  UserOutlined,
  PercentageOutlined,
  ReadOutlined,
  CoffeeOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "../../components/backstage/UserTable";
import OrderTable from "../../components/backstage/OrderTable";

const Backstage = () => {
  const navigate = useNavigate();
  const { Header, Sider, Content, Footer } = Layout;

  const items = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "銷售狀況"
    },
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
      key: "test",
      icon: <ExperimentOutlined />,
      label: "測試",
      children: [
        {
          key: "test1",
          label: "Team 1"
        },
        {
          key: "test2",
          label: "Team 2"
        }
      ]
    }
  ];

  // data
  const [collapsed, setCollapsed] = useState(false);
  const [siderSelected, setSiderSelected] = useState("order");
  // function
  const selectedItem = (e) => {
    setSiderSelected(e.key);
  };

  return (
    <div id="backstage">
      <Layout>
        <Sider className="sider" trigger={null} collapsed={collapsed}>
          <div className="logo" />
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
            className="header w-100"
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
          </Header>
          <Content
            style={{
              padding: 24,
              minHeight: 800
            }}
          >
            {siderSelected === "user" && <UserTable />}
            {siderSelected === "order" && <OrderTable />}
          </Content>
          <Footer>Fooooooter</Footer>
        </Layout>
      </Layout>
    </div>
  );
};
export default Backstage;
