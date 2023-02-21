import axios from "axios";
import { API_CONSTANS } from "../Assets/IConstans";

const jsonHeader = { "Content-Type": "application/json" };
const { SERVER_BASE_URL } = API_CONSTANS;

const serverPostRequest = async (
  api: string,
  data: { [key: string]: any },
  header?: { [key: string]: string },
) => {
  return await axios.post(SERVER_BASE_URL.concat(api), data, {
    headers: header ?? jsonHeader,
  });
};

const getRequestWithSearchParams = async (
  api: string,
  searchParamsObject: { [key: string]: string },
) => {
  return await axios.get(SERVER_BASE_URL.concat(api), {
    params: searchParamsObject,
  });
};

const deleteRequestWithSearchParams = async (
  api: string,
  searchParamsObject: { [key: string]: string },
) => {
  return await axios.delete(SERVER_BASE_URL.concat(api), {
    params: searchParamsObject,
  });
};

const serverPostFormDataRequest = async (api: string, formData: FormData) => {
  return await axios.post(SERVER_BASE_URL.concat(api), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const postFormData = async (api: string, formData: FormData) => {
  return await axios.post(SERVER_BASE_URL.concat(api), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const serverPostRequestAttachFiles = async (
  api: string,
  body: any,
  images: File[],
  document: File,
) => {
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    formData.append("files", images[i]);
  }
  formData.append("document", document);
  // formData.append("body", JSON.stringify(body));
  return await axios.post(SERVER_BASE_URL.concat(api), body, {
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getAllCities = async () => {
  const { REACT_APP_CITIES_URL } = process.env;
  const response = await axios.get(REACT_APP_CITIES_URL as string);
  if (response) {
    const results = response.data.result.records;
    if (results)
      return results.map((city: { שם_ישוב: string; סמל_ישוב: string }) => {
        return city.שם_ישוב;
      });
  }
  return null;
};

const getStreetsByCity = async (city: string) => {
  const { REACT_APP_STREETS_URL } = process.env;
  const response = await axios.get(
    (REACT_APP_STREETS_URL as string).concat(city),
  );
  if (response) {
    const results = response.data.result.records;
    if (results)
      return results.map((street: { שם_רחוב: string }) => {
        return street.שם_רחוב;
      });
  }
  return null;
};

const numbersList = [...new Array(100)].map((each, index) => {
  const stringIndex = index.toString();
  return {
    label: stringIndex,
    value: index,
  };
});

const HttpService = {
  getAllCities,
  getStreetsByCity,
  numbersList,
  serverPostRequest,
  serverPostRequestAttachFiles,
  getRequestWithSearchParams,
  postFormData,
  serverPostFormDataRequest,
  deleteRequestWithSearchParams,
};

export default HttpService;
