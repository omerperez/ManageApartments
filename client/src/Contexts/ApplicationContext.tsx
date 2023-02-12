import { createContext, useReducer } from "react";
import {
  IAppContext,
  IOwnerStatisticsData,
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

  function setOwnerStatisticsData(
    ownerStatisticsData: IOwnerStatisticsData | undefined,
  ) {
    console.log(ownerStatisticsData);
    privateDispatch({
      type: "setOwnerStatisticsData",
      ownerStatisticsData: ownerStatisticsData as IOwnerStatisticsData,
    });
  }

  const value = {
    appState: appState,
    onChangeMobileDashboard: onChangeMobileDashboard,
    setOwnerStatisticsData: setOwnerStatisticsData,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}

export { ApplicationPovider, ApplicationContext };
