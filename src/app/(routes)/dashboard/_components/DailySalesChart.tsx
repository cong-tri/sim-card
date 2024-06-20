/** @format */
"use client";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "../../../../../assets/recharts/src";

export default function DailySalesChart() {
  const data = [
    {
      name: "Jun",
      sales: 7000,
    },
    {
      name: "Jul",
      sales: 6000,
    },
    {
      name: "Aug",
      sales: 8000,
    },
    {
      name: "Sep",
      sales: 9000,
    },
    {
      name: "Oct",
      sales: 5000,
    },
    {
      name: "Nov",
      sales: 7500,
    },
    {
      name: "Dec",
      sales: 6500,
    },
  ];
  return (
    <>
      <LineChart
        width={500}
        height={250}
        data={data}
        className='border-b border-gray-400 pb-4'
        style={{ margin: "20px auto" }}>
        <Line type='monotone' dataKey='sales' stroke='#82ca9d' />
        <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </>
  );
}
