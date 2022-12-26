import { Apartment } from "../../Data/builders/Apartment";
import { IUserReq, IVerifyToken } from "../../Data/interfaces/Http";
import { IApartment } from "../../Data/interfaces/IApartment";
import { serverPostRequest } from "../HttpService";

const allApartmentsApi = "apartment/all";
const verifyTokenApi = "auth/verify";
const registerApi = "user/register";

const getAllApartments = async (id: string) => {
    const response = await serverPostRequest(allApartmentsApi, { id: id });
    console.log(response.data[0].mainimageindex);
    const data = response.data as IApartment[];
    let results: Apartment[] = [];
    data.forEach((apartment) => {
        results.push(new Apartment(apartment));
    });
    return results;
};

const registerRequest = async (user: IUserReq) => {
    const response = await serverPostRequest(registerApi, user);
    return response.status === 200;
}

const verifyToken = async (token: string) => {
    const response = await serverPostRequest(verifyTokenApi, { token: token });
    return response.data as IVerifyToken;
};

export { getAllApartments, registerRequest, verifyToken };
