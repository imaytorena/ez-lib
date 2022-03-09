import { BoxProps, Box, useColorMode, Thead, Tr, Th } from '@chakra-ui/react'
import React from 'react'

type HeaderRow = {
    key: string;
    label: string;
}

interface HeaderProps extends BoxProps {
    header_rows: HeaderRow[];
};

// const a: HeaderProps = [
//     { label: 'a' }
// ];

const Header = ({ header_rows }: HeaderProps) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Thead bg={colorMode === "light" ? "gray.200" : "gray.600"}>
            <Tr>
                {header_rows.map(header_row =>
                    <Th>{header_row.label}</Th>
                )}
            </Tr>
        </Thead>
    )
}

export default Header