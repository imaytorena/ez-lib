export interface Row {
    id: number;
    created_at?: Date;
    updated_at?: Date;
};

export type Table = Row[];

export type User = {
    id?: string,
    username: string;
    password?: string;

    code?: string;
    email?: string;
    
    name: string;
    last_name: string;
    
    genre?: string;
}

export interface Book extends Row {
    name: string;
    author: string;
}


export type Model = Book | User | undefined;


export * from "./routes";