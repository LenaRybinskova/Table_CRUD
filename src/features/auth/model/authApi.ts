import axios, {AxiosResponse} from 'axios'
import {BaseResponse, LoginData, Token} from '@/app/app.types.ts';


export const instance = axios.create({
    baseURL: 'https://test.v5.pryaniky.com',
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token && !config.url?.includes("/login")) {
        config.headers["x-auth"] = token;
    }

    return config;
});


export const authAPI = {
    login(data:LoginData) {
        return instance.post<BaseResponse<Token>, AxiosResponse<BaseResponse<Token>>, LoginData
        >('/ru/data/v3/testmethods/docs/login', data);
    },
}

