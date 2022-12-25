import { initialState } from "../Contexts/AuthContext";
import { IAuthContext } from "../Data/interfaces/IUser";
import { AuthAction } from "../Data/types/Auth";

export default function authReducer(
  authState: IAuthContext,
  action: AuthAction,
) {
  switch (action.type) {
    case "login": {
      return action.currentUser as IAuthContext;
    }
    case "changeLanguage": {
      return {
        ...authState,
        language: action.language,
      };
    }
    case "logout": {
      return {
        ...initialState,
      };
    }
    case "loading": {
      return {
        ...authState,
        loading: action.loading,
      };
    }
    default:
      return authState as IAuthContext;
  }
}
