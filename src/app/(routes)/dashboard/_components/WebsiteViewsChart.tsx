/** @format */
"use client";
import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "../../../../../assets/recharts/src";

const data = [
  {
    name: "Mon",
    views: 100,
  },
  {
    name: "Tue",
    views: 300,
  },
  {
    name: "Wed",
    views: 500,
  },
  {
    name: "Thu",
    views: 400,
  },
  {
    name: "Fri",
    views: 250,
  },
  {
    name: "Sat",
    views: 350,
  },
  {
    name: "Sun",
    views: 450,
  },
];
export default function WebsiteViewsChart() {
  return (
    <BarChart
      width={500}
      height={250}
      data={data}
      className='border-b border-gray-400 pb-4'
      style={{ margin: "20px auto" }}>
      <CartesianGrid stroke='#ccc' strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Bar dataKey='views' fill='#80C4E9' />
      <Tooltip />
      <Legend />
    </BarChart>
  );
}
