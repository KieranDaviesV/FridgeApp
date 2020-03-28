import axios, { AxiosRequestConfig } from "axios";
import request from "request";
// import { fatsecret } from "../config/fatsecret.config";

export interface IToken {
    tokenType: string;
    accessToken: string;
}

export const getFatSecret = (): Promise<IToken> => {
    return new Promise((resolve, reject) => {
        try {
            const options = {
                method: "POST",
                url: "https://oauth.fatsecret.com/connect/token",
                auth: {
                    // user: fatsecret.clientId,
                    // password: fatsecret.clientSecret
                },
                headers: { "content-type": "application/json" },
                form: {
                    grant_type: "client_credentials",
                    scope: "basic"
                },
                json: true
            };
            request(options, (error, response, body) => {
                if (error) {
                    throw new Error(error);
                }
                const token: IToken = {
                    tokenType: body.token_type,
                    accessToken: body.access_token
                };
                resolve(token);
            });
        } catch (error) {
            reject(error);
        }
    });

};
