import {IUser} from "@/models/user";

export interface AuthResponse{
    accessToken: string,
    refreshToken: string,
    user:IUser
}