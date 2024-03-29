import axios from "axios";
import {BASE_URL, NAME_OF_TOKEN} from "@/constants/pokemons";
import Cookies from "js-cookie";


const $api = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
})

$api.interceptors.request.use(
    (config) => {
        const token = Cookies.get(NAME_OF_TOKEN);
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default $api
