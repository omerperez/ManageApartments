import axios from "axios";
import { IVerifyToken, LoginResponse } from "../../Data/interfaces/Http";

const baseUrl = "http://localhost:3001/";
const loginApi = "auth/login";
const verifyTokenApi = "auth/verify";
const registerApi = "user/register";
const jsonHeader = { "Content-Type": "application/json" };

const loginRequest = async (mobile: string, password: string) => {
    const user = {
        mobile: mobile,
        password: password,
    };
    const response = await axios.post(baseUrl + loginApi, user, {
        headers: jsonHeader
    });
    return response.data as LoginResponse;
};

export interface IUserReq {
    mobile: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const registerRequest = async (user: IUserReq) => {
    const response = await axios.post(baseUrl + registerApi, user, {
        headers: jsonHeader
    });
    return response.status === 200;
}

const verifyToken = async (token: string) => {
    const response = await axios.post(baseUrl + verifyTokenApi,
        { token: token }, {
        headers: jsonHeader
    });
    return response.data as IVerifyToken;
};

export { loginRequest, registerRequest, verifyToken };
