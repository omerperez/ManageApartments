import { IUserReq, IVerifyToken, LoginResponse } from "../../Data/interfaces/Http";
import { serverPostRequest } from "../HttpService";

const loginApi = "auth/login";
const verifyTokenApi = "auth/verify";
const registerApi = "user/register";

const loginRequest = async (mobile: string, password: string) => {
    const user = {
        mobile: mobile,
        password: password,
    };
    const response = await serverPostRequest(loginApi, user);
    return response.data as LoginResponse;
};

const registerRequest = async (user: IUserReq) => {
    const response = await serverPostRequest(registerApi, user);
    return response.status === 200;
}

const verifyToken = async (token: string) => {
    const response = await serverPostRequest(verifyTokenApi, { token: token });
    return response.data as IVerifyToken;
};

export { loginRequest, registerRequest, verifyToken };
