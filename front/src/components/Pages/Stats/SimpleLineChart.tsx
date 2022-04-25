import { useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import Card from "./Card";

const data = [
  {
    name: "Dom",
    value: 10
  },
  {
    name: "Lun",
    value: 30
  },
  {
    name: "Mar",
    value: 10
  },
  {
    name: "Mie",
    value: 30
  },
  {
    name: "Jue",
    value: 23
  },
  {
    name: "Vie",
    value: 34
  },
  {
    name: "Sab",
    value: 11
  }
];

const SimpleLineChart = () => {
  return (
    <Card>
      <div className="flex caption2 flex-col ui-chart">
        <div className="ml-24 flex justify-center flex-col w-48 items-center mt-32 mb-10">
          <p className="caption2">Prestamos por dia de la semana</p>
          {/* <p className="subheading2">680</p> */}
        </div>
        <LineChart width={650} height={350} data={data}>
          <CartesianGrid />
          <Tooltip contentStyle={{backgroundColor: "rgba(0, 0, 0, 0.1)"}}/>
          <XAxis
            tick={{ fill: useColorModeValue('black', 'white') }}
            axisLine={false}
            tickLine={false}
            dataKey="name"
          />
          <YAxis
            tickCount={7}
            axisLine={false}
            tickLine={false}
            tick={{ fill: useColorModeValue('black', 'white') }}
            type="number"
            domain={[0, 10]}
          />
          <Line
            fill={useColorModeValue('black', '#8884d8')}
            stroke={useColorModeValue('black', '#8884d8')}
            dot={true}
            type="monotone"
            dataKey="value"
          />
        </LineChart>
      </div>
    </Card>
  );
};

export default SimpleLineChart;
