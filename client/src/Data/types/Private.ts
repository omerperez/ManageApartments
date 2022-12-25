import { IApartment, IContext } from "../interfaces/IApartment";
import { ITenant } from "../interfaces/ITenant";

type PrivateAction =
    | { type: "setApartment"; apartment: IApartment }
    | { type: "setTenant"; tenant: ITenant }
    | { type: "setStep", index: number }
// { type: "changeStepStatus"; key: "apartment" | "tenant" | "files", status: boolean }

type PrivateContextType = {
    privateState: IContext;
    setApartment: (apartment: IApartment) => void;
    setTenant: (tenant: ITenant) => void;
    setStep: (step: number) => void;
    // changeStepStatus: (stepKey: "apartment" | "tenant" | "files", status: boolean) => void;
};

export type { PrivateAction, PrivateContextType, };
