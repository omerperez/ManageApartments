import { IUser } from "../Data/interfaces/IUser";
import { AuthAction } from "../Data/types/Auth";
import { CookieService } from "../Services/CookieService";
import { tempUser } from "../Assets/StaticData";
import { initialState } from "../Contexts/AuthContext";

export default function authReducer(authState: IUser, action: AuthAction) {
  switch (action.type) {
    case "login": {
      CookieService.setUserObj(tempUser);
      return {
        ...authState,
        id: action.id,
      };
    }
    case "changeUser": {
      return {
        ...authState,
        firstName: action.firstName,
        lastName: action.lastName,
        mobile: action.mobile,
      };
    }
    case "changeLanguage": {
      return {
        ...authState,
        language: action.language,
      };
    }
    case "logout": {
      CookieService.removeUserObj();
      return {
        ...initialState,
      };
    }
    default:
      return authState;
  }
}
