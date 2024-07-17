// /** @format */
// "use client";
// import React from "react";
// import {
//   CartesianGrid,
//   Legend,
//   Line,
//   LineChart,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// export default function RevenueChart() {
//   const data = [
//     {
//       name: "Jun",
//       revenue: 4000,
//       avg_revenue: 2400,
//     },
//     {
//       name: "Jul",
//       revenue: 3000,
//       avg_revenue: 1398,
//     },
//     {
//       name: "Aug",
//       revenue: 2000,
//       avg_revenue: 9800,
//     },
//     {
//       name: "Sep",
//       revenue: 2780,
//       avg_revenue: 3908,
//     },
//     {
//       name: "Oct",
//       revenue: 1890,
//       avg_revenue: 4800,
//     },
//     {
//       name: "Nov",
//       revenue: 2390,
//       avg_revenue: 3800,
//     },
//     {
//       name: "Dec",
//       revenue: 3490,
//       avg_revenue: 4300,
//     },
//   ];
//   return (
//     <>
//       <LineChart
//         width={500}
//         height={250}
//         data={data}
//         className='border-b border-gray-400 pb-4'
//         style={{ margin: "20px auto" }}>
//         <Line type='monotone' dataKey='revenue' stroke='#82ca9d' />
//         <Line type='monotone' dataKey='avg_revenue' stroke='#8884d8' />
//         <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
//         <XAxis dataKey='name' />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//       </LineChart>
//     </>
//   );
// }
