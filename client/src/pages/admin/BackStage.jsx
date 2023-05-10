import {
  DesktopOutlined,
  FileOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;
const items = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "銷售狀況"
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: "會員管理"
  },
  {
    key: "3",
    icon: <UserOutlined />,
    label: "訂單管理"
  },
  {
    key: "4",
    icon: <UserOutlined />,
    label: "優惠券管理"
  },
  {
    key: "5",
    icon: <UserOutlined />,
    label: "文章管理"
  },

  {
    key: "sub1",
    icon: <TeamOutlined />,
    label: "測試",
    children: [
      {
        key: "6",
        label: "Team 1"
      },
      {
        key: "7",
        label: "Team 2"
      }
    ]
  },
  {
    key: "9",
    icon: <FileOutlined />
  }
];
const Backstage = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  return (
    <div id="backstage">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64
              }}
            />
          </Header>{" "}
          <Content
            style={{
              padding: 24,
              minHeight: 280,
              background: colorBgContainer
            }}
          >
            Content
          </Content>
          <Footer>Fooooooter</Footer>
        </Layout>
      </Layout>
    </div>
  );
};
export default Backstage;
