import Cookie from "universal-cookie";
import { IUser } from "../Data/interfaces/IUser";

const cookie = new Cookie();

const getUserId = () => {
    return cookie.get("userId");
}

const setUserId = (userId : string) => {
  return cookie.set("userId", userId);
};

const setUserObj = (user : IUser) => {
  cookie.set("userId", user.id);
  cookie.set("firstName", user.firstName);
  cookie.set("lastName", user.lastName);
  cookie.set("mobile", user.mobile);
  return;
};

const removeUserId = () => {
  return cookie.remove("userId");
};

const removeUserObj = () => {
  cookie.remove("userId");
  cookie.remove("firstName");
  cookie.remove("lastName");
  cookie.remove("mobile");
  return;
}

const CookieService = {
  getCookie: cookie,
  getUserId: getUserId,
  setUserId: setUserId,
  removeUserId: removeUserId,
  setUserObj: setUserObj,
  removeUserObj: removeUserObj,
}

export { CookieService }; 