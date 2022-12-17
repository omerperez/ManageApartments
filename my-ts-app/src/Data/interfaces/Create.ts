import { ValidationType } from "../types/Validation";

interface IFieldType {
    he_label: string;
    en_label: string;
    name: string;
    gridSize: number;
    type: "input" | "select" | "autocomplete" | "date";
    textType?: string;
}

interface IFieldTypeDemo {
    he_label: string;
    en_label: string;
    name: string;
    gridSize: number;
    type: "input" | "select" | "autocomplete" | "date";
    textType?: string;
    validation?: ValidationType;
    error?: string;
}


export type { IFieldType, IFieldTypeDemo, };