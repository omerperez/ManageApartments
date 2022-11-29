import { IApartment, } from "../interfaces/IApartment";
import { ITenant } from "../interfaces/ITenant";

type PrivateAction =
    | { type: "setApartment"; apartment: IApartment }
    | { type: "setTenant"; tenant: ITenant };

export type { PrivateAction };