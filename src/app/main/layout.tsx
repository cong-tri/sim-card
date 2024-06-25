/** @format */
"use client";
import { useState } from "react";
import { Button, Layout, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import MenuItems from "@/components/MenuItems";

const { Content, Footer, Sider, Header } = Layout;

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="lg">
        <div className="demo-logo-vertical" />
        <MenuItems />
      </Sider>
      <Layout className="ml-[200px]">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 20,
              minHeight: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>CCSIDD ©2015</Footer>
      </Layout>
    </Layout>
  );
}
