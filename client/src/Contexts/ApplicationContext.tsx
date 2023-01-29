import { createContext, useReducer } from "react";
import {
  IAppContext,
  PrivatePoviderProps,
} from "../Data/interfaces/IApartment";
import { AppContextType } from "../Data/types/Private";
import privateReducer from "../Reducers/Application";

const initialState: IAppContext | null = null;

const ApplicationContext = createContext<AppContextType | null>(null);

export default function ApplicationPovider({ children }: PrivatePoviderProps) {
  const [appState, privateDispatch] = useReducer(
    privateReducer,
    initialState as IAppContext,
  );

  function onChangeMobileDashboard(isOpen: boolean) {
    privateDispatch({ type: "onChangeMobileDashboard", isOpen: isOpen });
  }

  const value = {
    appState: appState,
    onChangeMobileDashboard: onChangeMobileDashboard,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}

export { ApplicationPovider, ApplicationContext };
