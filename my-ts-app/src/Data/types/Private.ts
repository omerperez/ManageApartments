import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";
import { IApartment, IContext } from "../interfaces/IApartment";
import { ITenant } from "../interfaces/ITenant";

type PrivateAction =
    | { type: "setApartment"; apartment: IApartment }
    | { type: "setTenant"; tenant: ITenant }
    | { type: "changeStepStatus"; key: "apartment" | "tenant" | "files", status: boolean }


// type FormInput =
//     | {
//         type: "select";
//         cancelLabel?: boolean;
//         label?: string;
//         name: string;
//         value?: string | number;
//         onChange?: (e: SelectChangeEvent<string | number>) => void;
//         error?: string;
//         disabled: boolean;
//         className?: string;
//         list: IMenuSelectItem[];
//     } | {
//         type: "autocomplete";
//         cancelLabel?: boolean;
//         label?: string;
//         name: string;
//         value?: string | number;
//         onChange?: (e: ChangeEvent<any>) => void;
//         error?: string;
//         disabled?: boolean;
//         className?: string;
//         list: IMenuSelectItem[];
//     } | {
//         type: "input";
//         cancelLabel: boolean;
//         label: string;
//         name: string;
//         value: string;
//         onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//         textType?: string;
//         disabled?: boolean;
//         error?: string;
//         className: string;
//         required: boolean;
//     } | {
//         type: "date";
//         cancelLabel: boolean;
//         label: string;
//         name: string;
//         value: string;
//         onChange: (key: any, value?: any) => void;
//         disabled?: boolean;
//         validation?: {
//             function: (date: string) => boolean;
//             errorComment: ((status: boolean) => string) | string;
//         };
//     }

type PrivateContextType = {
    privateState: IContext;
    setApartment: (apartment: IApartment) => void;
    setTenant: (tenant: ITenant) => void;
    changeStepStatus: (stepKey: "apartment" | "tenant" | "files", status: boolean) => void;
};

export type { PrivateAction, PrivateContextType, };
