import { IAppContext } from "../Data/interfaces/IApartment";
import { ApplicationContextAction } from "../Data/types/Private";

export default function privateReducer(
  appState: IAppContext,
  action: ApplicationContextAction,
) {
  switch (action.type) {
    case "onChangeMobileDashboard": {
      return (appState = {
        ...appState,
        isOpenDashboardMobile: action.isOpen,
      });
    }
    case "setOwnerStatisticsData": {
      return (appState = {
        ...appState,
        ownerStatisticsData: action.ownerStatisticsData,
      });
    }

    default:
      return appState;
  }
}
