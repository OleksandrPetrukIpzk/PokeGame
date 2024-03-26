import {NAME_OF_TOKEN} from "@/constants/pokemons";
import {logIn, logOut} from "@/redux/features/auth-slice";
import {AppDispatch} from "@/redux/store";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import UserServices from "@/services/userServices";
import {remove, start} from "@/redux/features/achievements";
import {ACHIEVEMENT, KEYS_ACHIEVEMENTS} from "@/constants/achievement";
import {Dispatch, SetStateAction} from "react";
import {IUser} from "@/models/user";
import Cookies from "js-cookie";

export const validateEmail = (email: string) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
const applyAllAchives = (ids: number[], arrCounts: number[]) =>{
    KEYS_ACHIEVEMENTS.map(key => {
        let lastIndex = -1;
        ACHIEVEMENT[key].map(element => {
            if(ids.includes(element.id)){
                const idx = ids.findIndex(i => i === element.id)
                lastIndex = ACHIEVEMENT[key].findIndex(i => i.id === ids[idx])
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

export const getUserById = async (id: string, setState: Dispatch<SetStateAction<IUser>>) => {
    const response = await UserServices.getUserById(id)
    setState(response.data)
}

export  const getAuth = async (dispatch: AppDispatch, id: string, router: AppRouterInstance) =>{
    try {
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
        router.push('login')
    }
}

export const configureAchives = async (response: any, dispatch: AppDispatch) =>{
    const arrCounts: number[] = []
    applyAllAchives(response, arrCounts)
    dispatch(start({
        ids: response,
        click: arrCounts[0],
        countOfWins: arrCounts[1],
        countOfLose: arrCounts[2],
        countOfPokemons: arrCounts[3],
        countOfStage: arrCounts[4],
        countOfLoseCoins: arrCounts[5],
        countOfRichCoins: arrCounts[6]
    }))
}

export const logout = async (dispatch: AppDispatch, router: AppRouterInstance) =>{
    try {
        Cookies.remove(NAME_OF_TOKEN);
        dispatch(logOut)
        dispatch(remove)
        router.push('/login')
    } catch (e) {

    }
}


export const handleChangeEmail = (value: string, setIsValid: Dispatch<SetStateAction<boolean>>, setErrors: Dispatch<SetStateAction<string[]>>, setEmail: Dispatch<SetStateAction<string>>) => {
    if(validateEmail(value)){
        setIsValid(true)
        setErrors((prev: string[]) => {
            if (prev.includes('email')) {
                const index = prev.findIndex(item => item === 'email');
                prev.splice(index, 1);
            }
            return prev;
        });
    } else{
        setIsValid(false)
        setErrors((prev: string[]) => {
            if (!prev.includes('email')) {
                prev.push('email');
            }
            return prev;
        });
    }
    setEmail(value);
}
