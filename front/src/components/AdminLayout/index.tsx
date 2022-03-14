import React, { ReactNode } from 'react'
import { BoxProps } from '@chakra-ui/react';
import SidebarWithHeader from '../Sidebar';

interface AdminLayout extends BoxProps {
    onClose: () => void;
}
const AdminLayout = ({ children }: { children: ReactNode; }) => {
    return (
        <SidebarWithHeader>
            {children}
        </SidebarWithHeader>
    )
}

export default AdminLayout;