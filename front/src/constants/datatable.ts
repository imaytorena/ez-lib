import { Component } from "react";
import { Model } from "./models";

export interface Row {
    id: string | number;
    created_at?: Date;
    updated_at?: Date;
};

export type Table = Row[];
export type HeaderRow = {
    key: string;
    label: string;
    uses?: { key: string; label: string };
    custom_row?: (params : CustomRowProps) => Component;
}

export interface CustomRowProps {
	header: HeaderRow;
	data: Model | Row;
	index: number;
}