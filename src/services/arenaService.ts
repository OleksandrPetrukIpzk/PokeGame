import {Rang} from "@/constants/types";
import $api from "@/http";
import {AxiosResponse} from "axios";

export default class ArenaService {
    static async getAllFights(): Promise<AxiosResponse<Rang[]>>{
        return $api.get<Rang[]>('/rang')
    }
    static async getFightForUserByName(name: string): Promise<AxiosResponse<Rang[]>>{
        return $api.get<Rang[]>('/rang/userFights/' + name)
    }
    static async setFight(user: {whoStart: string, whoDefence: string, whoWin: string}): Promise<AxiosResponse<Rang>>{
        return $api.post<Rang>('/rang', {user})
    }
}
