import { API_CONSTANS } from "../../Assets/IConstans";
import { Apartment } from "../../Data/builders/Apartment";
import { CreateApartmentDto } from "../../Data/interfaces/dto/CreateApartment.dto";
import { EditApartmentDto } from "../../Data/interfaces/dto/EditApartment.dto";
import { Tenant } from "../../Data/interfaces/entities/Tenant.entity";
import { IApartmentServerCreateRequest, ITenantCreateForm } from "../../Data/interfaces/Form.interface";
import { IApartment } from "../../Data/interfaces/IApartment";
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
        tenant: Tenant,
        tenantHistory: Tenant[]
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
    const formData = new FormData();
    formData.append("updateApartment", JSON.stringify(updateApartment));
    for (let i = 0; i < newImages.length; i++) {
        formData.append("files", newImages[i]);
    }
    const response = await HttpService.postFormData
        (API_CONSTANS.UPDATE_APARTMENT_API, formData);
    return response.data;
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
    return response;
};


export { getAllApartments, createApartment, getApartmentView, createApartmentRequest, updateApartment };
