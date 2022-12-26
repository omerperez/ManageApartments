import axios from "axios";

const citiesApi = "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=100000";
const streetsApi = "https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&limit=10000&q=";
const baseUrl = "http://localhost:3001/";
const jsonHeader = { "Content-Type": "application/json" };

const serverPostRequest = async (api: string, data: { [key: string]: any }, header?: { [key: string]: string }) => {
    return await axios.post(baseUrl.concat(api), data, {
        headers: header ?? jsonHeader
    });
};

const getAllCities = async () => {
    const response = await axios.get(citiesApi);
    if (response) {
        const results = response.data.result.records;
        if (results)
            return results.map((city: { שם_ישוב: string; }) => {
                return {
                    label: city.שם_ישוב,
                    value: city.שם_ישוב
                };
            });
    }
    return null;
};

const getStreetsByCity = async (city: string) => {
    const response = await axios.get(streetsApi.concat(city));
    if (response) {
        const results = response.data.result.records;
        if (results)
            return results.map((street: { שם_רחוב: string; }) => {
                return {
                    label: street.שם_רחוב,
                    value: street.שם_רחוב
                };
            });
    }
    return null;
};

const numbersList = [...new Array(100)]
    .map((each, index) => {
        const stringIndex = index.toString();
        return ({
            label: stringIndex,
            value: index,
        });
    });

export { getAllCities, getStreetsByCity, numbersList, serverPostRequest };
