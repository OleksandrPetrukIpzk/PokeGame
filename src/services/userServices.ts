import {AxiosResponse} from "axios";
import {IUser, Potions} from "@/models/user";
import $api from "@/http";

export default class UserServices {
    static async getAll(): Promise<AxiosResponse<IUser[]>>{
        return $api.get<IUser[]>('/user')
    }
    static async getUserById(id: string): Promise<AxiosResponse<IUser>>{
        return $api.get<IUser>('/user/'+id)
    }
    static async addAchiveById(id: string, index: number): Promise<AxiosResponse<IUser>> {
        return $api.post<IUser>('user/achive/'+id, {index})
    }

    static async changeCountOfMoney(id: string, money: number): Promise<AxiosResponse<IUser>> {
        return $api.post<IUser>('user/money/'+id, {money})
    }

    static async changeCurrentPokemonById(id: string, pokemonId: string){
        return $api.post<IUser>('user/select/'+id, {pokemonId})
    }
    static async changeStage(id: string, stage: number){
        return $api.post<IUser>('user/stage/'+id, {stage})
    }

    static async setPotions(id: string, potion: Potions){
        return $api.post<IUser>('user/setPotion/'+id, {potion})
    }

    static async removePokemon(id: string, idPokemon: string){
        return $api.post<IUser>('user/removePokemon/'+id, {idPokemon})
    }

    static async addPokemon(id: string, idPokemon: string){
        return $api.post<IUser>('user/pokemon/'+ id, {idPokemon})
    }

    static async changeRangById(id: string, rang: number){
        return $api.post<IUser>('user/rang/'+id, {rang})
    }

}
