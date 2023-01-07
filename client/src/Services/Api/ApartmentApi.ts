import { Apartment } from "../../Data/builders/Apartment";
import { IApartmentServerCreateRequest, ITenantCreateForm } from "../../Data/interfaces/Form.interface";
import { IUserReq, IVerifyToken } from "../../Data/interfaces/Http";
import { IApartment } from "../../Data/interfaces/IApartment";
import { ITenant } from "../../Data/interfaces/ITenant";
import HttpService from "../HttpService";
import { API_CONSTANS } from "../../Assets/IConstans";
import { CreateApartmentDto } from "../../Data/interfaces/dto/CreateApartmentDto";

const getAllApartments = async (mobile: string) => {
    const response = await HttpService.getRequestWithSearchParams(
        API_CONSTANS.OWNER_APARTMENTS_API,
        { mobile: mobile }
    );
    const data = response.data as IApartment[];
    let results: Apartment[] = [];
    data.forEach((apartment) => {
        results.push(new Apartment(apartment));
    });
    return results;
};

const getApartmentView = async (apartmentId: string) => {
    const response = await HttpService.serverPostRequest(
        API_CONSTANS.APARTMENT_VIEW_API,
        { id: apartmentId }
    );
    const data = response.data;
    const apartment = data.apartment as IApartment;
    const [tenant] = data.tenant as ITenant[];
    return {
        apartment: new Apartment(apartment),
        tenant: tenant
    };
};

// const uploadFile = async (files: File[]) => {
//     const response = await serverPostRequestAttachFiles(uploadFilesApi, files);
//     console.log(response);
//     return response;
// };

const createApartment = async (
    apartmentDetails: CreateApartmentDto,
    files: File[]) => {
    const response = await HttpService.serverPostRequestAttachFiles1
        (API_CONSTANS.CREATE_APARTMENT_API, apartmentDetails, files);
    console.log("response!");
    console.log(response);
    return response;
};

const createApartmentRequest = async (apartment: IApartmentServerCreateRequest,
    tenant: ITenantCreateForm,
    images: File[],
    document: File) => {
    const response = await HttpService.serverPostRequestAttachFiles
        (API_CONSTANS.CREATE_APARTMENT_API, {
            apartment: apartment,
            tenant: tenant,
        }, images, document);
    console.log("response!");
    console.log(response);
    return response;
};

const registerRequest = async (user: IUserReq) => {
    const response = await HttpService.serverPostRequest(
        API_CONSTANS.REGISTER_API,
        user
    );
    return response.status === 200;
};

const verifyToken = async (token: string) => {
    const response = await HttpService.serverPostRequest(
        API_CONSTANS.VERIFY_TOKEN_API,
        { token: token }
    );
    return response.data as IVerifyToken;
};

export { getAllApartments, registerRequest, verifyToken, createApartment, getApartmentView, createApartmentRequest };
