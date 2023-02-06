import HttpService from "../HttpService";

// constans 
const CALCULATOR_PRICE_API = 'user/calculator';

async function getCalculatorPrices() {
    const { data } = await HttpService.getRequestWithSearchParams(
        CALCULATOR_PRICE_API,
        {}
    );
    return data as {
        water: {
            low: number;
            high: number;
        }, electric: number,
    };

}


const ApiService = { getCalculatorPrices, };
export default ApiService;
