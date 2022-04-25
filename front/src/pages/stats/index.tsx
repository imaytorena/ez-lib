import { Box, Flex, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import AdminLayout from "../../components/AdminLayout";
import BarChart from "../../components/Pages/Stats/BarChart";
import PieChart from "../../components/Pages/Stats/PieChart";
import SimpleLineChart from "../../components/Pages/Stats/SimpleLineChart";
import StackedAreaChart from "../../components/Pages/Stats/StackedAreaChart";

function Stats({ stats }) {
    return <AdminLayout>
        <Flex justifyContent={"space-around"} flexWrap={"wrap"}>
            <SimpleLineChart />
            <StackedAreaChart />
            <BarChart />
            <PieChart />
        </Flex>
    </AdminLayout>;
}

export default Stats
