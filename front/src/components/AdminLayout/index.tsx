import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { BoxProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
} from 'react-icons/fi';

import SidebarWithHeader from '../Sidebar';

interface RouteObject {
    key: string;
    label: string;
    icon: IconType;
    path: string;
};

interface RoutesObject {
    [index: string]: RouteObject;
}
export const admin_routes : RoutesObject = {
    'home': { key: '', label: 'Inicio', icon: FiHome, path: '/' },
    'books': { key: 'books', label: 'Libros', icon: FiTrendingUp, path: '/books' },
    'materials': { key: 'materials', label: 'Materiales', icon: FiCompass, path: '/materials' },
};

export const RoutesContext = React.createContext(admin_routes);

interface AdminLayout extends BoxProps {
    onClose: () => void;
}
const AdminLayout = ({ children }: { children: ReactNode; }) => {
    return (
        <RoutesContext.Provider value={admin_routes}>
            {/* <Toolbar /> */}
            <SidebarWithHeader>
                {children}
            </SidebarWithHeader>
        </RoutesContext.Provider>
    )
}

export default AdminLayout