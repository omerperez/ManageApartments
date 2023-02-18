import axios from "axios";
import { API_CONSTANS } from "../Assets/IConstans";

const citiesApi =
  "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=100000";
const streetsApi =
  "https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&limit=10000&q=";
const baseUrl = "http://100.25.22.15/";
// "http://localhost:3001/";
const jsonHeader = { "Content-Type": "application/json" };

const serverPostRequest = async (
  api: string,
  data: { [key: string]: any },
  header?: { [key: string]: string },
) => {
  return await axios.post(baseUrl.concat(api), data, {
    headers: header ?? jsonHeader,
  });
};

const getRequestWithSearchParams = async (
  api: string,
  searchParamsObject: { [key: string]: string },
) => {
  return await axios.get(API_CONSTANS.SERVER_BASE_URL.concat(api), {
    params: searchParamsObject,
  });
};

const deleteRequestWithSearchParams = async (
  api: string,
  searchParamsObject: { [key: string]: string },
) => {
  return await axios.delete(API_CONSTANS.SERVER_BASE_URL.concat(api), {
    params: searchParamsObject,
  });
};

const serverPostFormDataRequest = async (api: string, formData: FormData) => {
  return await axios.post(baseUrl.concat(api), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const postFormData = async (api: string, formData: FormData) => {
  return await axios.post(baseUrl.concat(api), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ({
//   method: "post",
//   url: baseUrl.concat(api),
//   data: formData,
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// });
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
  return await axios.post(baseUrl.concat(api), body, {
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getAllCities = async () => {
  const response = await axios.get(citiesApi);
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
  const response = await axios.get(streetsApi.concat(city));
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
