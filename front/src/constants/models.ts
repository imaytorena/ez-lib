import { Row } from "./datatable";

export interface User extends Row {
    id: string | number,
    username: string;
    password?: string;

    code?: string;
    email?: string;
    
    name: string;
    last_name: string;
    
    genre?: string;
}

export interface Book extends Row {
    id: string | number,
    
    title: string;
    description?: string;
    autor: string;
    
    publisher: string;
    isbn: string;
    year: string;
    genre: string;

    available: string;
    stock: string;
}

export interface Material extends Row {
    id: string | number,
    serial_number: string;    
    option: string;
    details: string;
    brand: string;
    model: string;
    status: string;
}

export type Model = User | Material | Book | undefined;
