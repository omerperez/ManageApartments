import { IContext } from "../Data/interfaces/IApartment";
import { PrivateAction } from "../Data/types/Private";

export default function privateReducer(
  privateState: IContext,
  action: PrivateAction,
) {
  switch (action.type) {
    case "setApartment": {
      return {
        ...privateState,
        apartment: action.apartment,
      };
    }
    case "setTenant": {
      return {
        ...privateState,
        tenant: action.tenant,
      };
    }
    default:
      return privateState;
  }
}
