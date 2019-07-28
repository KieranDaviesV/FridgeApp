import Axios, { AxiosRequestConfig } from "axios";
import { getFatSecret } from "./oauth";

export interface IFatsecretFood {
    food_id: string;
    food_name: string;
    food_type: FatsecretFoodType;
    food_url: string;
    brand_name?: string;
    food_description?: string;
}
export enum FatsecretFoodType {
    Brand = "Brand",
    Generic = "Generic",
}
export interface IFatsecretResponse {
    foods?: {
        food: IFatsecretFood[];
        max_results: number;
        total_results: number;
        page_number: number;
    };
    food?: IFatsecretFood;
}
interface IFatsecretParams {
    name: string;
    value: string;
}
export default class FatSecretAPI {
    private APIPath: string;

    constructor() {
        this.APIPath = "https://platform.fatsecret.com/rest/server.api";
    }
    public foodSearch = async (foodSearch: string) => {
        try {
            const headers = await this.getHeaders();
            console.log("here");
            const response = await Axios.post(this.APIPath, null, {
                headers,
                params: {
                    method: "foods.search",
                    ["search_expression"]: foodSearch,
                    format: "json"
                }
            });
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error.response.headers);
            throw error;
        }
    }
    private paramGenerator = (params: IFatsecretParams[]) => {
        const paramObject: any = {};
        params.forEach((param) => {
            paramObject[param.name] = param.value;
        });
        paramObject.format = "json";
        return paramObject;
    }
    private getHeaders = async () => {
        try {
            const token = await getFatSecret();
            const headersObject = {
                "Authorization": `${token.tokenType} ${token.accessToken}`,
                "Content-Type": "application/json"
            };
            return headersObject;
        } catch (error) {
            throw error;
        }
    }

}
