import { BoxProps, Box, useColorMode, Td, Tr, Tfoot } from '@chakra-ui/react'
import React from 'react'
import { Pagination } from '../../Pagination';

interface FooterProps extends BoxProps {
    total?: number;
    current_page?: number;
    last_page?: number;
    onPageChange: (page: number) => void;
};
const Footer = ({ onPageChange, current_page, total, last_page, ...rest }: FooterProps) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        total > 10 && (
            <Tfoot>
                <Tr>
                    <Td colSpan={5}>
                        <Pagination
                            current_page={current_page}
                            last_page={last_page}
                            onPageChange={onPageChange}
                            {...rest}
                        />
                    </Td>
                </Tr>
            </Tfoot>
        )
    )
}

export default Footer