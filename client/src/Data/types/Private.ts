import { IAppContext } from "../interfaces/IApartment";

type ApplicationContextAction =
    | { type: "onChangeMobileDashboard"; isOpen: boolean }

type AppContextType = {
    appState: IAppContext;
    onChangeMobileDashboard: (isOpen: boolean) => void;
};

export type { ApplicationContextAction, AppContextType, };
