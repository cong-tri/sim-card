/** @format */
"use client";
// import { authSocket, productSocket } from "@/socket";
import { useEffect, useState } from "react";
import { Button, Layout, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import MenuItems from "@/components/MenuItems";
import { ThemeProvider } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify/amplifyconfiguration.json";
import { AmplifyOutputs } from "aws-amplify/adapter-core";
// import { SimCardProvider } from "@/context/SimCardContext";
// import { fetchAuthSession } from "aws-amplify/auth";

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

  // const [isConnected, setIsConnected] = useState(false);

  // const [authQRCode, setAuthQRCode] = useState<any>({});
  // const [product, setProduct] = useState<any>({});

  // useEffect(() => {
  //   const currentSession = async () => {
  //     const session = await fetchAuthSession();
  //     // console.log(session.tokens?.idToken);
  //   };
  //   currentSession();

  //   if (authSocket.connected && productSocket.connected) {
  //     setIsConnected(true);
  //   }

  //   // auth socket
  //   authSocket.on("connect", () => setIsConnected(true));
  //   authSocket.emit("qrcode", (res: any) => {
  //     const qrcode: string = res?.qrcode;
  //     setAuthQRCode(qrcode);
  //   });
  //   authSocket.on("disconnect", () => setIsConnected(false));

  //   // product socket
  //   productSocket.on("connect", () => setIsConnected(true));
  //   productSocket.emit(
  //     "price",
  //     {
  //       appId: "com.ccsidd.rtonesg",
  //     },
  //     (values: any) => setProduct(values)
  //   );
  //   productSocket.on("disconnect", () => setIsConnected(false));

  //   return () => {
  //     // auth socket
  //     authSocket.off("connect", () => setIsConnected(true));
  //     authSocket.off("disconnect", () => setIsConnected(false));

  //     // product socket
  //     productSocket.off("connect", () => setIsConnected(true));
  //     productSocket.off("disconnect", () => setIsConnected(false));
  //   };
  // }, [isConnected]);
    
  return (
    <div>helo</div>
    // <SimCardProvider value={{ authQRCode, product }}>
      // <ThemeProvider>
      //   <Layout>
      //     <Sider
      //       trigger={null}
      //       collapsible
      //       collapsed={collapsed}
      //       breakpoint="lg"
      //     >
      //       <div className="demo-logo-vertical" />
      //       <MenuItems />
      //     </Sider>
      //     <Layout>
      //       <Header style={{ padding: 0, background: colorBgContainer }}>
      //         <Button
      //           type="text"
      //           icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      //           onClick={() => setCollapsed(!collapsed)}
      //           style={{
      //             fontSize: "16px",
      //             width: 64,
      //             height: 64,
      //           }}
      //         />
      //       </Header>
      //       <Content style={{ margin: "24px 16px 0" }}>
      //         <div
      //           style={{
      //             padding: 20,
      //             minHeight: "100vh",
      //             background: colorBgContainer,
      //             borderRadius: borderRadiusLG,
      //           }}
      //         >
      //           {children}
      //         </div>
      //       </Content>
      //       <Footer style={{ textAlign: "center" }}>CCSIDD ©2015</Footer>
      //     </Layout>
      //   </Layout>
      // </ThemeProvider>
    // </SimCardProvider>
  );
}
