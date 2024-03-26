import {isTheSame} from "@/functions/logic";
import {EMPTY_STRING, NAME_OF_TOKEN} from "@/constants/pokemons";
import ArenaService from "@/services/arenaService";
import {Dispatch, SetStateAction} from "react";
import {Rang} from "@/constants/types";
import AuthServices from "@/services/authServices";
import {changeEmail, changeImg, changeName, changePassword, logOut} from "@/redux/features/auth-slice";
import {validateEmail} from "@/functions/auth";
import {AnyAction} from "redux";
import Cookies from "js-cookie";
import {errorNotification} from "@/functions/pocemons";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
export const getAllFights = async (name: string, setFights: Dispatch<SetStateAction<Rang[]>>) =>{
    if(!isTheSame(name, EMPTY_STRING)){
        const response = await ArenaService.getFightForUserByName(name);
        setFights(response.data);
    }
}

export const handleChangePersonalData = async (func: string, inputValue: string, setColorInput: Dispatch<SetStateAction<string>>, dispatch: Dispatch<AnyAction>, userId: string, setError: Dispatch<SetStateAction<string>>) =>{
    switch (func){
        case 'name': {
            if(inputValue.length >= 3){
                try {
                    await AuthServices.changeName(userId, inputValue);
                    setColorInput('success')
                    dispatch(changeName(inputValue))
                }
                catch (e: any) {
                    setColorInput('danger');
                    setError(e.response.data.error)
                }
            } else {
                setColorInput('danger')
            }
            break;
        }
        case 'email':{
            if(validateEmail(inputValue)){
                try {
                    await AuthServices.changeEmail(userId, inputValue)
                    setColorInput('success')
                    dispatch(changeEmail(inputValue))
                }
                catch (e: any) {
                    setColorInput('danger')
                    setError(e.response.data.error)
                }
            } else {
                setColorInput('danger')
            }
            break;
        }
        case 'password': {
            if(inputValue.length >= 5){
                try {
                    await AuthServices.changePassword(userId, inputValue)
                    setColorInput('success')
                    dispatch(changePassword(inputValue))
                }
                catch (e) {
                    setColorInput('danger')
                    setError("Server Error")
                }
            } else {
                setColorInput('danger')
            }
            break;
        }
        case 'img':{
            try {
                await AuthServices.changeImg(userId, inputValue)
                setColorInput('success')
                dispatch(changeImg(inputValue))
            }
            catch (e) {
                setColorInput('danger')
            }
        }
    }
}

export const deleteAccount = async (userId: string, dispatch: Dispatch<AnyAction>, router: AppRouterInstance) =>{
    try{
        await AuthServices.delete(userId)
        dispatch(logOut())
        Cookies.remove(NAME_OF_TOKEN)
        router.push('/registration/')
    } catch (e) {
        errorNotification('Server is not work')
    }
}
