import { IUserReq, IVerifyToken, LoginResponse } from "../../Data/interfaces/Http";
import HttpService from "../HttpService";

const loginApi = "auth/login";
const verifyTokenApi = "auth/verify";
const registerApi = "user/register";

const loginRequest = async (mobile: string, password: string) => {
    const user = {
        mobile: mobile,
        password: password,
    };
    const response = await HttpService.serverPostRequest(loginApi, user);
    return response.data as LoginResponse;
};

const registerRequest = async (user: IUserReq) => {
    return await HttpService.serverPostRequest(registerApi, user);
}

const verifyToken = async (token: string) => {
    const response = await HttpService.serverPostRequest(verifyTokenApi, { token: token });
    return response.data as IVerifyToken;
};

export { loginRequest, registerRequest, verifyToken };
