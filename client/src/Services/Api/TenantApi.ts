import { API_CONSTANS } from "../../Assets/IConstans";
import { CreateTenantDto } from "../../Data/interfaces/dto/CreateTenantt.dto";
import { Tenant } from "../../Data/interfaces/entities/Tenant.entity";
import { ITenant } from "../../Data/interfaces/ITenant";
import HttpService from "../HttpService";

// constans 
const TENANT_HISTORY_API = 'tenant/tenants_history';
const CHANGE_TENANT_API = "tenant/change_tenant";
const EDIT_TENANT_API = "tenant/edit";


async function getAgreementsData(owner: string) {
    const { data } = await HttpService.getRequestWithSearchParams(
        'tenant/agreements',
        { owner: owner }
    );
    // return data as { tenantId: string; agreements: string[]; currentAgreement: string }[];
    return data as {
        name: string;
        agreements: string[];
        currentAgreement: string;
    }[][];
}

async function getTenantsHistory(owner: string) {
    const response = await HttpService.getRequestWithSearchParams(
        TENANT_HISTORY_API,
        { owner: owner }
    );
    return response.data as Tenant[];
};

async function createTenant(apartmentDetails: CreateTenantDto, document: File) {
    const formData = new FormData();
    formData.append("tenant", JSON.stringify(apartmentDetails));
    formData.append("doc", document);
    const response = await HttpService.serverPostFormDataRequest
        (API_CONSTANS.CREATE_TENANT_API, formData);
    return response.data as ITenant;
};

async function updateTenant(apartmentDetails: Tenant, newDocument: File | null) {
    const formData = new FormData();
    formData.append("tenant", JSON.stringify(apartmentDetails));
    if (newDocument) {
        formData.append("newDocument", newDocument);
    }
    const response = await HttpService.serverPostFormDataRequest
        (EDIT_TENANT_API, formData);
    return response.data as ITenant;
};

async function changeTenant(owner: string, newTenantId: string, apartmentId: string) {
    const response = await HttpService.serverPostRequest(
        CHANGE_TENANT_API, {
        owner: owner,
        newTenantId: newTenantId,
        apartmentId: apartmentId
    }
    );
    return response;
};


export default { getAgreementsData, getTenantsHistory, createTenant, updateTenant, changeTenant };
