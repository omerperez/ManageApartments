export declare class ScrapperService {
    constructor();
    getTheCurrentElectricityPrice(): Promise<string>;
    getTheCurrentWaterPrice(): Promise<{
        low: string;
        high: string;
    }>;
}
