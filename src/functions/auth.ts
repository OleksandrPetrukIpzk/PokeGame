import axios from "axios";
import {BASE_URL, NAME_OF_TOKEN} from "@/constants/pokemons";
import AuthServices from "@/services/authServices";
import {logIn, logOut} from "@/redux/features/auth-slice";
import {AppDispatch} from "@/redux/store";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import UserServices from "@/services/userServices";
import {remove, start} from "@/redux/features/achievements";
import {ACHIEVEMENT, KEYS_ACHIEVEMENTS} from "@/constants/achievement";

const applyAllAchives = (ids: number[], arrCounts: number[]) =>{
    KEYS_ACHIEVEMENTS.map(key => {
        let lastIndex = -1;
        ACHIEVEMENT[key].map(element => {
            if(ids.includes(element.id)){
                lastIndex = ids.findIndex(i => i === element.id)
            }
        })
        if(lastIndex >= 0){
            arrCounts.push(ACHIEVEMENT[key][lastIndex].count)
        }
        else{
            arrCounts.push(0)
        }
    })

}

export  const getAuth = async (dispatch: AppDispatch, id: string) =>{
    try {
        const arrCounts: number[] = []
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
        applyAllAchives(response.data.arrAchives, arrCounts)
        dispatch(start({
            ids: response.data.arrAchives,
            click: arrCounts[0],
            countOfWins: arrCounts[1],
            countOfLose: arrCounts[2],
            countOfPokemons: arrCounts[3],
            countOfStage: arrCounts[4],
            countOfLoseCoins: arrCounts[5],
            countOfRichCoins: arrCounts[6]
        }))
    } catch (e) {
        console.log('problem')
    }
}

export const logout = async (dispatch: AppDispatch, router: AppRouterInstance) =>{
    try {
        localStorage.removeItem(NAME_OF_TOKEN);
        dispatch(logOut)
        dispatch(remove)
        router.push('/login')
    } catch (e) {

    }
}


