export interface Row {
    id: number;
    created_at?: Date;
    updated_at?: Date;
};

export type Table = Row[];

export type User = {
    id: string,
    name: string;
    email: string;
    createdAt: string;
}
export interface Book extends Row {
    name: string;
    author: string;
}