import { Apartment } from "../../Data/builders/Apartment";
import { IUserReq, IVerifyToken } from "../../Data/interfaces/Http";
import { IApartment } from "../../Data/interfaces/IApartment";
import { ITenant } from "../../Data/interfaces/ITenant";
import { serverPostRequest } from "../HttpService";

const allApartmentsApi = "apartment/all";
const apartmentViewApi = "apartment/find";
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

const getApartmentView = async (apartmentId: string) => {
    const response = await serverPostRequest(apartmentViewApi, { id: apartmentId });
    const data = response.data;
    const apartment = data.apartment as IApartment;
    const [tenant] = data.tenant as ITenant[];
    return {
        apartment: new Apartment(apartment),
        tenant: tenant
    };
};

const registerRequest = async (user: IUserReq) => {
    const response = await serverPostRequest(registerApi, user);
    return response.status === 200;
}

const verifyToken = async (token: string) => {
    const response = await serverPostRequest(verifyTokenApi, { token: token });
    return response.data as IVerifyToken;
};

export { getAllApartments, registerRequest, verifyToken, getApartmentView };
