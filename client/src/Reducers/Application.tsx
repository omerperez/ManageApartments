import { IAppContext } from "../Data/interfaces/IApartment";
import { ApplicationContextAction } from "../Data/types/Private";

export default function privateReducer(
  appState: IAppContext,
  action: ApplicationContextAction,
) {
  switch (action.type) {
    case "onChangeMobileDashboard": {
      return {
        isOpenDashboardMobile: action.isOpen,
      };
    }

    default:
      return appState;
  }
}
