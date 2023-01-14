import Cookie from "universal-cookie";
import { IUser } from "../Data/interfaces/IAuthentication";

const cookie = new Cookie();

const getUserId = () => {
  return cookie.get("userId");
};

const setToken = (token: string) => {
  return cookie.set("token", token);
};

const initUser = (id: string, token: string) => {
  cookie.set("token", token);
  cookie.set("userId", id);
};

const setUserId = (userId: string) => {
  // cookie.set("firstName", user.firstName);
  // cookie.set("lastName", user.lastName);
  cookie.set("userId", userId);
  // cookie.set("mobile", user.mobile);
  return;
};

const removeUserId = () => {
  return cookie.remove("userId");
};

const removeUserObj = () => {
  cookie.remove("token");
  cookie.remove("userId");
  // cookie.remove("firstName");
  // cookie.remove("lastName");
  // cookie.remove("mobile");
  return;
};

const getToken = () => {
  return cookie.get("token");
};

const CookieService = {
  getCookie: cookie,
  getUserId: getUserId,
  setToken: setToken,
  getToken: getToken,
  removeUserId: removeUserId,
  setUserId: setUserId,
  removeUserObj: removeUserObj,
  initUser: initUser,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUserId,
  getToken,
  setUserId,
  setToken,
  removeUserId,
  removeUserObj,
  initUser,
};
