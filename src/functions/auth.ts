import axios from "axios";
import {BASE_URL, NAME_OF_TOKEN} from "@/constants/pokemons";
import AuthServices from "@/services/authServices";
import {logIn, logOut} from "@/redux/features/auth-slice";
import {AppDispatch} from "@/redux/store";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import UserServices from "@/services/userServices";
export  const getAuth = async (dispatch: AppDispatch, id: string) =>{
    try {
        const token = localStorage.getItem(NAME_OF_TOKEN)
        const response = await UserServices.getUserById(id)
        dispatch(logIn({
            id: response.data._id,
            name: response.data.name,
            email: response.data.email,
            password: response.data.password,
            img: response.data.img,
            selectedPokemon: response.data.selectedPokemon,
            coins: response.data.coins,
            rang: response.data.rang,
            stageInOfflineArena: response.data.stageInOfflineArena,
            arrPokemons: response.data.arrPokemons,
            arrAchives: response.data.arrAchives,
            arrPotions: response.data.arrPotions,
        }));
    } catch (e) {
        console.log('problem')
    }
}

export const logout = async (dispatch: AppDispatch, router: AppRouterInstance) =>{
    try {
        localStorage.removeItem(NAME_OF_TOKEN);
        dispatch(logOut)
        router.push('/login')
    } catch (e) {

    }
}
