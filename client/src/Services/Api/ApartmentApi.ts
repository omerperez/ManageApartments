import { API_CONSTANS } from "../../Assets/IConstans";
import { Apartment } from "../../Data/builders/Apartment";
import { CreateApartmentDto } from "../../Data/interfaces/dto/CreateApartmentDto";
import { CreateTenantDto } from "../../Data/interfaces/dto/CreateTenanttDto";
import { EditApartmentDto } from "../../Data/interfaces/dto/EditApartmentDto";
import { IApartmentServerCreateRequest, ITenantCreateForm } from "../../Data/interfaces/Form.interface";
import { IUserReq, IVerifyToken } from "../../Data/interfaces/Http";
import { IApartment } from "../../Data/interfaces/IApartment";
import { ITenant } from "../../Data/interfaces/ITenant";
import HttpService from "../HttpService";

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
    const response = await HttpService.getRequestWithSearchParams(
        API_CONSTANS.APARTMENT_VIEW_API,
        { apartmentId: apartmentId, owner: '0522520484' }
    );
    const data: {
        apartment: IApartment,
        tenant: ITenant,
        tenantHistory: ITenant[]
    } = response.data;
    return {
        apartment: new Apartment(data.apartment),
        tenant: data.tenant,
        tenantHistory: data.tenantHistory
    };
};

const createApartment = async (
    apartmentDetails: CreateApartmentDto,
    files: File[]) => {
    const formData = new FormData();
    formData.append("apartmentDetails", JSON.stringify(apartmentDetails));
    for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
    }
    const response = await HttpService.postFormData
        (API_CONSTANS.CREATE_APARTMENT_API, formData);
    return response.data as IApartment;
};

const updateApartment = async (
    updateApartment: EditApartmentDto,
    newImages: File[]
) => {
    console.log(updateApartment);
    const formData = new FormData();
    formData.append("updateApartment", JSON.stringify(updateApartment));
    for (let i = 0; i < newImages.length; i++) {
        formData.append("files", newImages[i]);
    }
    const response = await HttpService.postFormData
        (API_CONSTANS.UPDATE_APARTMENT_API, formData);
    return response.data;
};

const createTenant = async (
    apartmentDetails: CreateTenantDto,
    document: File) => {
    const formData = new FormData();
    formData.append("tenant", JSON.stringify(apartmentDetails));
    formData.append("doc", document);
    const response = await HttpService.serverPostFormDataRequest
        (API_CONSTANS.CREATE_TENANT_API, formData);
    return response.data as ITenant;
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

export { getAllApartments, createTenant, registerRequest, verifyToken, createApartment, getApartmentView, createApartmentRequest, updateApartment };
