import { ISelectMenuItem } from "./Form.interface";

interface ITranslateLabel {
    he_label: string;
    en_label: string;
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
    validationFunction?: (value?: string) => boolean;
    error?: string;
}

export type { IField, ITranslateLabel };
