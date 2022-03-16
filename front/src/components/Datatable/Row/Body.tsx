import { BoxProps, Box, useColorMode, Td, Tbody, useColorModeValue, Tr } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React from 'react'
import { Model, Row } from '../../../constants';

type HeaderRow = {
    key: string;
    label: string;
}
interface BodyProps extends BoxProps {
    header_rows: HeaderRow[];
    data: Model[] | Row[];
};
const Body = ({ header_rows, data }: BodyProps) => {
    const router = useRouter()
    const borderColor = useColorModeValue("gray.200", "gray.600");
	const { colorMode } = useColorMode();

    let key_from_path = router.pathname.split("/")[1];
    key_from_path = (key_from_path == '' ? 'home' : key_from_path);
    return (
        <Tbody>
            {data?.map((data_row: Model | Row, index: number) => {
                return (
                    <Tr
                    key={`${data_row['id']}-${index}`}
                        onClick={() => {
                            router.push(`/${key_from_path}/${data_row["id"]}`)
                        }}
                        _hover={{
                            cursor: "pointer",
                            bg: `${colorMode === "light" ? "gray.50" : "gray.800"}`
                        }}
                    >
                        {header_rows.map((header_row: HeaderRow, iindex: number) =>
                            <Td
                                key={`${header_row}-${iindex}`}
                                borderColor={borderColor}
                            >
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