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
const { Header, Sider, Content, Footer } = Layout;
const items = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Option 1"
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: "Option 2"
  },
  {
    key: "sub1",
    icon: <UserOutlined />,
    label: "User",
    children: [
      {
        key: "3",
        label: "Tom"
      },
      {
        key: "4",
        label: "Bill"
      },
      {
        key: "5",
        label: "Alex"
      }
    ]
  },
  {
    key: "sub2",
    icon: <TeamOutlined />,
    label: "Team",
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
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["3"]}
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
  );
};
export default Backstage;
