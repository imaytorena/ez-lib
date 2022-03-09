
import React from "react";
import { IconType } from "react-icons";
import { FiCompass, FiHome, FiTrendingUp } from "react-icons/fi";


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
    'home': { key: 'home', label: 'Inicio', icon: FiHome, path: '/' },
    'books': { key: 'books', label: 'Libros', icon: FiTrendingUp, path: '/books' },
    'materials': { key: 'materials', label: 'Materiales', icon: FiCompass, path: '/materials' },
};

export const RoutesContext = React.createContext(routes);