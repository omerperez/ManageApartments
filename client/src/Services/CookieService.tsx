import Cookie from "universal-cookie";

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
  cookie.set("userId", userId);
  return;
};

const removeUserId = () => {
  return cookie.remove("userId");
};

const removeUserObj = () => {
  cookie.remove("token");
  cookie.remove("userId");
  return;
};

const getToken = () => {
  return cookie.get("token");
};

const CookieService = {
  getUserId,
  getToken,
  setUserId,
  setToken,
  removeUserId,
  removeUserObj,
  initUser,
};

export default CookieService;
