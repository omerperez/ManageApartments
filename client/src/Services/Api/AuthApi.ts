import { IVerifyToken } from "../../Data/interfaces/dto/Auth/Verify.dto";
import { ILoginUserDto } from "../../Data/interfaces/entities/User.entity";
import { IUserReq } from "../../Data/interfaces/Http";
import HttpService from "../HttpService";

// Constans 
const LOGIN_API = "auth/login";
const VERIFY_API = "auth/verify";
const REGISTER_API = "user/register";

const loginRequest = async (mobile: string, password: string) => {
    const user = {
        mobile: mobile,
        password: password,
    };
    const response = await HttpService.serverPostRequest(LOGIN_API, user);
    return response.data as ILoginUserDto;
};

const registerRequest = async (user: IUserReq) => {
    return await HttpService.serverPostRequest(REGISTER_API, user);
};

const verifyToken = async (token: string) => {
    const response = await HttpService.serverPostRequest(VERIFY_API, { token: token });
    return response.data as IVerifyToken;
};

export { loginRequest, registerRequest, verifyToken };
