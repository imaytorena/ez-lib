import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";
import Card from "./Card";

const data = [
    {
        name: "Enero",
        material: 4000,
        libro: 2400
    },
    {
        name: "Febrero",
        material: 3000,
        libro: 1398
    },
    {
        name: "Marzo",
        material: 2000,
        libro: 9800
    },
    {
        name: "Abril",
        material: 2780,
        libro: 3908
    },
    {
        name: "Mayo",
        material: 1890,
        libro: 4800
    },
    {
        name: "Junio",
        material: 2390,
        libro: 3800
    }
];

const StackedAreaChart = () => {
    return (
        <Card>
            <div className="ml-24 flex justify-center flex-col w-48 items-center mt-32 mb-10">
            <p className="caption2">Tipos de prestamo por mes</p>
            <p className="subheading2">(Primer semestre)</p>
            </div>
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
          <Tooltip contentStyle={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}/>
                <Area
                    type="monotone"
                    dataKey="material"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                />
                <Area
                    type="monotone"
                    dataKey="libro"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                />
            </AreaChart>
        </Card>
    );
}

export default StackedAreaChart
