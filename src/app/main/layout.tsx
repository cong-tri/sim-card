/** @format */
"use client";
import { useState } from "react";
import { Button, Layout, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import MenuItems from "@/components/MenuItems";
import { ThemeProvider } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify/amplifyconfiguration.json";
import { AmplifyOutputs } from "aws-amplify/adapter-core";

Amplify.configure(outputs as AmplifyOutputs, { ssr: true });

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
    <ThemeProvider>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="lg">
          <div className="demo-logo-vertical" />
          <MenuItems />
        </Sider>
        <Layout>
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
    </ThemeProvider>
  );
}
