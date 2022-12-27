import { createContext, useReducer } from "react";
import {
  IApartment,
  IContext,
  PrivatePoviderProps,
} from "../Data/interfaces/IApartment";
import { ITenant } from "../Data/interfaces/ITenant";
import { PrivateContextType } from "../Data/types/Private";
import privateReducer from "../Reducers/Private";

const initialState: IContext | null = null;

const PrivateContext = createContext<PrivateContextType | null>(null);

export default function PrivatePovider({ children }: PrivatePoviderProps) {
  const [privateState, privateDispatch] = useReducer(
    privateReducer,
    initialState as IContext,
  );

  function setApartment(apartment: IApartment) {
    privateDispatch({ type: "setApartment", apartment: apartment });
  }

  function setTenant(tenant: ITenant) {
    privateDispatch({ type: "setTenant", tenant: tenant });
  }

  function setStep(index: number) {
    privateDispatch({ type: "setStep", index: index });
  }

  const value = {
    privateState: privateState,
    setApartment: setApartment,
    setTenant: setTenant,
    setStep: setStep,
  };

  return (
    <PrivateContext.Provider value={value}>{children}</PrivateContext.Provider>
  );
}

export { PrivatePovider, PrivateContext };
