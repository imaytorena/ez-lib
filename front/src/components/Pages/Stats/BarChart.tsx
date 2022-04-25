import React from 'react'
import Card from './Card'
import {
    BarChart as RCBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const data = [
    {
        name: "Estudiante",
        material: 400,
        libro: 240,
        amt: 240
    },
    {
        name: "Docente",
        material: 300,
        libro: 139,
        amt: 221
    },
    {
        name: "Admin",
        material: 100,
        libro: 80,
        amt: 229
    }
];

const BarChart = () => {
    return (
        <Card>
            <div className="ml-24 flex justify-center flex-col w-48 items-center mt-32 mb-10">
                <p className="caption2">Tipos de usuarios con prestamos</p>
                {/* <p className="subheading2">680</p> */}
            </div>
            <RCBarChart
                width={500}
                height={500}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >   
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip contentStyle={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}/>
                <Legend />
                <Bar dataKey="libro" fill="#8884d8" />
                <Bar dataKey="material" fill="#82ca9d" />
            </RCBarChart>
        </Card>
    )
}

export default BarChart