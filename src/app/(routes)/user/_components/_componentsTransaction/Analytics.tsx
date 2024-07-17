// /** @format */

// import React from "react";
// import { Col, Row } from "antd";
// import Title from "antd/es/typography/Title";
// import { FieldTimeOutlined } from "@ant-design/icons";
// import RevenueChart from "./RevenueChart";
// import WebsiteViewsChart from "./WebsiteViewsChart";
// import DailySalesChart from "./DailySalesChart";
// import SalesByAgeChart from "./SalesByAgeChart";
// export default function Analytics() {
//   const listAnalytics = [
//     {
//       id: 1,
//       analyticsLabel: "Revenue",
//       analyticsChart: <RevenueChart />,
//     },
//     {
//       id: 2,
//       analyticsLabel: "Website Views",
//       analyticsChart: <WebsiteViewsChart />,
//     },
//     {
//       id: 3,
//       analyticsLabel: "Daily Sales",
//       analyticsChart: <DailySalesChart />,
//     },
//     {
//       id: 4,
//       analyticsLabel: "Sales By Age",
//       analyticsChart: <SalesByAgeChart />,
//     },
//   ];
//   return (
//     <>
//       <Row className="my-8" align={"middle"} justify={"center"}>
//         {listAnalytics.map((items: any) => {
//           return (
//             <>
//               <Col
//                 key={items.id}
//                 span={11}
//                 className={`border border-gray-400 rounded-xl ${
//                   items.id === 1
//                     ? "mr-8"
//                     : items.id === 3
//                     ? "mt-8 mr-8"
//                     : items.id === 4
//                     ? "mt-8"
//                     : ""
//                 }`}
//               >
//                 {items.analyticsChart}
//                 <Title level={3} className="pl-8">
//                   {items.analyticsLabel}
//                 </Title>
//                 <p className="text-gray-400 text-lg pl-8 pb-4">
//                   <FieldTimeOutlined /> Just update
//                 </p>
//               </Col>
//             </>
//           );
//         })}
//       </Row>
//     </>
//   );
// }
