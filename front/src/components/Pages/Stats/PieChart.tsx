import React from 'react'
import Card from './Card'
import { PieChart as RCPieChart, Pie, Legend, Tooltip } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 }
];

const PieChart = () => {
  return (
      <Card>
        <RCPieChart width={400} height={400}>
            <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data}
                cx={200}
                cy={200}
                outerRadius={150}
                fill="#8884d8"
                label
            />
        </RCPieChart>
      </Card>
  )
}

export default PieChart