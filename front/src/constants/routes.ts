import React from 'react'
import { IconType } from "react-icons";
import { FaMoneyBillAlt, FaUserFriends } from "react-icons/fa";
import { FiHome, FiBook, FiMonitor, FiShare, FiUserX, FiFileText, FiTrendingUp } from "react-icons/fi";

interface RouteObject {
    key: string;
    label: string;
    icon: IconType;
    path: string;
};

interface RoutesObject {
    [index: string]: RouteObject;
}
export const routes: RoutesObject = {
    'users': { key: 'users', label: 'Usuarios', icon: FaUserFriends, path: '/users' },
    'roles_permissions': { key: 'roles_permissions', label: 'Roles y Permisos', icon: FaUserFriends, path: '/roles_permissions' },
    'books': { key: 'books', label: 'Libros', icon: FiBook, path: '/books' },
    'materials': { key: 'materials', label: 'Materiales', icon: FiMonitor, path: '/materials' },
    'loans': { key: 'loans', label: 'Prestamos', icon: FiShare, path: '/loans' },
    'penalties': { key: 'penalties', label: 'Penalizaciones', icon: FiUserX, path: '/penalties' },
    'fees': { key: 'fees', label: 'Cobros', icon: FaMoneyBillAlt, path: '/fees' },
    'reports': { key: 'reports', label: 'Reportes', icon: FiFileText, path: '/reports' },
    'stats': { key: 'stats', label: 'Estadisticas', icon: FiTrendingUp, path: '/stats' },
};
