import { ISelectMenuItem } from "../interfaces/Form.interface";

type ValidationType =
    | { type: "select"; function: (value: string, list: ISelectMenuItem[]) => boolean; }
    | { type: "input"; function: (value: string) => boolean; }

export type { ValidationType };