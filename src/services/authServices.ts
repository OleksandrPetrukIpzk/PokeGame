import $api from "@/http";
import {Axios, AxiosResponse} from "axios";
import {AuthResponse} from "@/models/authResponse";

export default class AuthServices {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', {email, password})
    }
    static async registration(userName:string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', {userName, email, password})
    }
    static async logout(): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/logout')
    }
    static async addPokemon(selectedPokemon:string, coins: number): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/addPokemon', {selectedPokemon, coins})
    }
}