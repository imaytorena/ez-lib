import React, { ReactNode } from 'react'
import { BoxProps, Flex } from '@chakra-ui/react';
import SidebarWithHeader from '../Sidebar';

interface AdminLayout extends BoxProps {
    onClose: () => void;
}
const AdminLayout = ({ children }: { children: ReactNode; }) => {
    return (
        <SidebarWithHeader>
            <Flex
                w="100%"
                maxWidth={1220}
                mx="auto"
                px="6"
                my="6"
                direction="column"
            >
                {children}
            </Flex>
        </SidebarWithHeader>
    )
}

export default AdminLayout;