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

type InputFieldType =
    | { fieldType: 'input', inputType: 'text' | 'password' | 'id' | 'number' | 'mobile' | 'phone' | 'email' }
    | { fieldType: 'select', list?: ISelectMenuItem[], apiListKey?: string }
    | { fieldType: 'date', isPastDate: boolean | "both" }
    | { fieldType: 'autocomplete', apiListKey: string }

interface IField extends ITranslateLabel {
    key: string;
    gridSize: number;
    type: InputFieldType;
    validation?: ValidationType;
    error?: string;
}

export type { IFieldType, IField, ITranslateLabel };