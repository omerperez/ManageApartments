import axios from "axios";

const baseUrl = "http://localhost:8000/";
const loginApi = "user";
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
    const [data] = response.data;
    return data;
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
    console.log(response);
    return response.status === 200;
}

export { loginRequest, registerRequest };