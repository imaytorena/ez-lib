export interface Row {
    id: number;
    created_at?: Date;
    updated_at?: Date;
};

export type Table = Row[];