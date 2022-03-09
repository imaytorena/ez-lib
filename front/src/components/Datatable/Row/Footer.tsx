import { BoxProps, Box, useColorMode, Td, Tr, Tfoot } from '@chakra-ui/react'
import React from 'react'
import { Pagination } from '../../Pagination';

interface FooterProps extends BoxProps {
    totalCount: number;
    page: number;
    setPage: (page: number) => void;
};
const Footer = ({ totalCount, page, setPage }: FooterProps) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        totalCount > 10 && (
            <Tfoot>
                <Tr>
                    <Td colSpan={5}>
                        <Pagination
                            totalCountOfRegisters={totalCount}
                            currentPage={page}
                            onPageChange={setPage}
                        />
                    </Td>
                </Tr>
            </Tfoot>
        )
    )
}

export default Footer