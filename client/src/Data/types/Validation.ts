import { ISelectMenuItem } from "../interfaces/IForm";

type ValidationType =
    | { type: "select"; function: (value: string, list: ISelectMenuItem[]) => boolean; }
    | { type: "input"; function: (value: string) => boolean; }

export type { ValidationType };