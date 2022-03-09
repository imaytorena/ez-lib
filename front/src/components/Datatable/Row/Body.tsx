import { BoxProps, Box, useColorMode, Td, Tbody, useColorModeValue, Tr } from '@chakra-ui/react'
import React from 'react'
import { Model } from '..';

type HeaderRow = {
    key: string;
    label: string;
}
interface BodyProps extends BoxProps {
    header_rows: HeaderRow[];
    data: Model[];
};
const Body = ({ header_rows, data }: BodyProps) => {
    const borderColor = useColorModeValue("gray.200", "gray.600");
    return (
        <Tbody>
            {data.map((data_row: Model, index: number) => {
                return (
                    <Tr key={`${index}`}>
                        {header_rows.map((header_row: HeaderRow, iindex: number) =>
                            <Td key={`${iindex}`} borderColor={borderColor}>
                                {data_row[header_row.key]}
                            </Td>
                        )}
                    </Tr>
                )
            })}
        </Tbody>
    )
}

export default Body