import axios from "axios";
import {BASE_URL, NAME_OF_TOKEN} from "@/constants/pokemons";

const token = localStorage.getItem(NAME_OF_TOKEN)

const $api = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    headers:{
        authorization: `Bearer ${token}`
    }
})


export default $api
