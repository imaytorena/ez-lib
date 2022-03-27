import { BoxProps, Box, useColorMode, Td, Tbody, useColorModeValue, Tr, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React from 'react'
import { HeaderRow, Model, Row } from '../../../constants';

interface BodyProps extends BoxProps {
    header_rows: HeaderRow[];
    data: Model[] | Row[];
    onClickRow?: (header: HeaderRow[], data: Model | Row, index: number) => void;
};
const Body = ({ header_rows, data, onClickRow }: BodyProps) => {
    const router = useRouter()
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const { colorMode } = useColorMode();

    let key_from_path = router.pathname.split("/")[1];
    key_from_path = (key_from_path == '' ? 'home' : key_from_path);
    return (
        <Tbody>
            {data?.map((dr: Model | Row, index: number) => {
                return (
                    <Tr
                        key={`${dr['id']}-${index}`}
                        onClick={onClickRow ? () => { onClickRow(header_rows, dr, index) }
                            : () => {
                                router.push(`/${key_from_path}/${dr["id"]}`)
                            }}
                        _hover={{
                            cursor: "pointer",
                            bg: `${colorMode === "light" ? "gray.50" : "gray.800"}`
                        }}
                    >
                        {header_rows.map((hr: HeaderRow, iindex: number) => {
                            return (hr.custom_row ?
                                hr.custom_row({
                                    header: hr,
                                    data: dr,
                                    index: iindex,
                                    ...{
                                        "borderColor": borderColor
                                    }
                                })
                                : <Td
                                    key={`${hr}-${iindex}`}
                                    borderColor={borderColor}
                                >
                                    <Text noOfLines={1}>
                                        {hr.uses ? hr.uses[dr[hr.key]] : dr[hr.key]}
                                    </Text>
                                    {/* <Text noOfLines={1} color={(hr.key == "stock" && parseInt(dr["available"])) && "red.700"}>
                                        {hr.uses ? hr.uses[dr[hr.key]] : dr[hr.key]}
                                    </Text> */}
                                </Td>)
                        })}
                    </Tr>
                )
            })}
        </Tbody>
    )
}

export default Body