// @ts-ignore
import axios from "axios";
import {AuthResponse} from "@/models/authResponse";
import {BASE_URL} from "@/constants/pokemons";
import AuthServices from "@/services/authServices";
import {logIn, logOut} from "@/redux/features/auth-slice";
import {AppDispatch} from "@/redux/store";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
export  const getAuth = async (dispatch: AppDispatch) =>{
    try {
        const response = await axios.get<AuthResponse>(`${BASE_URL}/refresh`, {withCredentials: true})
        localStorage.setItem('token', response.data.accessToken)
        console.log(response.data);
        dispatch(logIn({
            userName: response.data.user.userName,
            selectedPokemon: response.data.user.selectedPokemon,
            arrPokemons: response.data.user.arrPokemons,
            coins: response.data.user.coins,
            stageInOfflineArena: response.data.user.stageInOfflineArena,
            email: response.data.user.email,
        }));
    } catch (e) {
        console.log('problem')
    }
}

export const logout = async (dispatch: AppDispatch, router: AppRouterInstance) =>{
    try {
        const response = await AuthServices.logout();
        localStorage.removeItem('token');
        dispatch(logOut)
        router.push('/registration')
        console.log('exit')
    } catch (e) {

    }
}