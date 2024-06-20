/** @format */
"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "../../../../../assets/recharts/src";
const data = [
  {
    age: "16-20",
    salesByAge: 10,
  },
  {
    age: "21-25",
    salesByAge: 50,
  },
  {
    age: "26-30",
    salesByAge: 70,
  },
  {
    age: "31-36",
    salesByAge: 100,
  },
  {
    age: "36-42",
    salesByAge: 60,
  },
  {
    age: "42-50",
    salesByAge: 120,
  },
  {
    age: "50+",
    salesByAge: 200,
  },
];
export default function SalesByAgeChart() {
  return (
    <BarChart
      width={500}
      height={250}
      data={data}
      className='border-b border-gray-400 pb-4'
      style={{ margin: "20px auto" }}>
      <CartesianGrid stroke='#ccc' strokeDasharray='3 3' />
      <XAxis dataKey='age' />
      <YAxis />
      <Bar dataKey='salesByAge' fill='#80C4E9' />
      <Tooltip />
      <Legend />
    </BarChart>
  );
}
