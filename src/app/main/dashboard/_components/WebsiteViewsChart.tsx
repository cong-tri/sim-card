/** @format */
"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Rectangle,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

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
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Bar dataKey='views' fill="#80C4E9" activeBar={<Rectangle fill="pink" stroke="blue" />}/>
      <Tooltip />
      <Legend />
    </BarChart>
  );
}
