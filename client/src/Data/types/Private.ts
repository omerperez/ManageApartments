import { IAppContext, IOwnerStatisticsData } from "../interfaces/IApartment";

type ApplicationContextAction =
    | { type: "onChangeMobileDashboard"; isOpen: boolean }
    | { type: 'setOwnerStatisticsData'; ownerStatisticsData: IOwnerStatisticsData }

type AppContextType = {
    appState: IAppContext;
    onChangeMobileDashboard: (isOpen: boolean) => void;
    setOwnerStatisticsData: (ownerStatisticsData: IOwnerStatisticsData) => void;
};

export type { ApplicationContextAction, AppContextType, };
