/** @format */
"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Button, Layout, theme } from "antd";
import MenuItems from "@/components/MenuItems";
import "./_styles/globals.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Content, Footer, Sider, Header } = Layout;

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AntdRegistry>
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              breakpoint='lg'
            >
              <div className='demo-logo-vertical' />
              <MenuItems />
            </Sider>
            <Layout>
              <Header style={{ padding: 0, background: colorBgContainer }}>
                <Button
                  type='text'
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
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
                  }}>
                  {children}
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }}>CCSIDD ©2015</Footer>
            </Layout>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
