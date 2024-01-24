import {AxiosResponse} from "axios";
import {IUser} from "@/models/user";
import $api from "@/http";
import {AuthResponse} from "@/models/authResponse";

export default class UserServices {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>>{
        return $api.get<IUser[]>('/users')
    }
    static async changeSelectedPokemon(selectedPokemon:string): Promise<AxiosResponse<string>>{
        return $api.post<string>('/selectPokemon', {selectedPokemon})
    }
    static async addCoins(email:string, coins:number): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/addCoins', {email, coins})
    }
    static async nextStage(stage: number): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/nextStoryStep', {stage})
    }
}