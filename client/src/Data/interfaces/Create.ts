import { ValidationType } from "../types/Validation";
import { ISelectMenuItem } from "./IForm";

interface ITranslateLabel {
    he_label: string;
    en_label: string;
}

interface IFieldType extends ITranslateLabel {
    name: string;
    gridSize: number;
    type: "input" | "select" | "autocomplete" | "date";
    textType?: string;
}

interface IFieldTypeDemo extends ITranslateLabel {
    name: string;
    gridSize: number;
    type: "input" | "select" | "autocomplete" | "date";
    textType?: string;
    list?: ISelectMenuItem[];
    validation?: ValidationType;
    error?: string;
}

export type { IFieldType, IFieldTypeDemo, ITranslateLabel };