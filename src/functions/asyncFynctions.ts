import {isTheSame} from "@/functions/logic";
import {DEFAULT_LINK, EMPTY_STRING, NAME_OF_TOKEN, NUMBER_ONE} from "@/constants/pokemons";
import ArenaService from "@/services/arenaService";
import {Dispatch, SetStateAction} from "react";
import {EvolutionT, PokemonsByFilterT, Rang, TypesT} from "@/constants/types";
import AuthServices from "@/services/authServices";
import {
    changeCountOfMoney,
    changeEmail,
    changeImg,
    changeName,
    changePassword,
    logIn,
    logOut, setPotions
} from "@/redux/features/auth-slice";
import {configureAchives, validateEmail} from "@/functions/auth";
import {AnyAction} from "redux";
import Cookies from "js-cookie";
import {
    errorNotification,
    isIncludesPokemon,
    isMoreOneCoin,
    isRealPokemon,
    randomPokemonNumber
} from "@/functions/pocemons";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import UserServices from "@/services/userServices";
import {IUser, Potions} from "@/models/user";
import axios from "axios";
import {addAchives} from "@/functions/achives";
import {addCountOfLoseCoins, addCountOfPokemons} from "@/redux/features/achievements";
import arg from "arg";
import {POTIONS} from "@/constants/user";
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

export const getAllUsersForRating = async (setUsers: Dispatch<SetStateAction<IUser[]>>, setDefaultUsers: Dispatch<SetStateAction<IUser[]>>) => {
    const response = await UserServices.getAll();
    setUsers(response.data.sort((a, b) => b.rang - a.rang));
    setDefaultUsers(response.data.sort((a, b) => b.rang - a.rang));
}

export const getPokemonsByType = (name: string, setListOfPokemons: Dispatch<SetStateAction<PokemonsByFilterT[]>>) =>{
    axios?.get('https://pokeapi.co/api/v2/type/'+ name).then(a => setListOfPokemons(a.data.pokemon)).catch((e) => console.log(e));
}

export const getAllPokemonsTypes = (setFilter: Dispatch<SetStateAction<TypesT[]>>) =>{
    axios.get(DEFAULT_LINK +'type').then(data => setFilter(data.data.results)).catch(() => errorNotification);
}

export const getFirstPokemon = async (setNumberPokemon: Dispatch<SetStateAction<number>>, id: string, setIsClicked: Dispatch<SetStateAction<boolean>>) =>{
    const numberPokemon = randomPokemonNumber();
    setNumberPokemon(numberPokemon);
    await UserServices.addPokemon(id, numberPokemon.toString());
    await UserServices.changeCurrentPokemonById(id, numberPokemon.toString());
    await UserServices.changeCountOfMoney(id, 20);
    setIsClicked(true);
}

export const clickLogin = async (name: string, email: string, password: string, dispatch: Dispatch<AnyAction>, router: AppRouterInstance, setErrorFromBack: Dispatch<SetStateAction<string>>) =>{
    try {
        const response = await AuthServices.logIn(name, email, password);
        Cookies.set(NAME_OF_TOKEN, response.data.access_token);
        dispatch(logIn({
            id: response.data.user._id,
            name: response.data.user.name,
            email: response.data.user.email,
            password: response.data.user.password,
            img: response.data.user.img,
            selectedPokemon: response.data.user.selectedPokemon,
            coins: response.data.user.coins,
            rang: response.data.user.rang,
            stageInOfflineArena: response.data.user.stageInOfflineArena,
            arrPokemons: response.data.user.arrPokemons,
            arrAchives: response.data.user.arrAchives,
            arrPotions: response.data.user.arrPotions,
        }));
        await configureAchives(response.data.user.arrAchives, dispatch);
        router.push('/menu')
    } catch (e: any) {
        setErrorFromBack(e.response.data.error);
    }
}

export  const updatePokemon = async (lvl: number, idUpdate: string, evolutionData: EvolutionT[], selectedPokemon: string, id: string, coins: number, router: AppRouterInstance) =>{
    const url = evolutionData[lvl].pokemon.url;
    const segments = url.split('/');
    const pokemonId = segments[segments.length - 2];
    if(isTheSame(selectedPokemon, idUpdate)){
        await UserServices.changeCurrentPokemonById(id, pokemonId);
    }
    await UserServices.removePokemon(id, idUpdate);
    await UserServices.addPokemon(id, pokemonId);
    await UserServices.changeCountOfMoney(id, coins - (lvl * 20));
    router.push('/pokemon/' + pokemonId);
}

export const clickRegistration = async (name: string, email: string, password: string, dispatch: Dispatch<AnyAction>, router: AppRouterInstance, setErrorFromBack: Dispatch<SetStateAction<string>>) => {
    try {
        const response = await AuthServices.create(name, email, password);
        dispatch(logIn({
            id: response.data.user._id,
            name: response.data.user.name,
            email: response.data.user.email,
            password: response.data.user.password,
            img: response.data.user.img,
            selectedPokemon: response.data.user.selectedPokemon,
            coins: response.data.user.coins,
            rang: response.data.user.rang,
            stageInOfflineArena: response.data.user.stageInOfflineArena,
            arrPokemons: response.data.user.arrPokemons,
            arrAchives: response.data.user.arrAchives,
            arrPotions: response.data.user.arrPotions,
        }));
        Cookies.set(NAME_OF_TOKEN, response.data.access_token)
        router.push('/introduction')
    } catch (e: any) {
        setErrorFromBack(e.response.data.error);
    }
}

export const buyPokemon = async (coins: number, arrPokemons: string[], setNumberPokemon: Dispatch<SetStateAction<number>>, id: string, setIsClicked: Dispatch<SetStateAction<boolean>>, dispatch: Dispatch<AnyAction>, countOfPokemons: number, ids: number[], t: Function, countOfLoseCoins: number) => {
    if(isMoreOneCoin(coins)) {
        let randomNumber = randomPokemonNumber();
        const isPokemon = await isRealPokemon(randomNumber)
        if(isIncludesPokemon(arrPokemons, randomNumber) && isPokemon){
            setNumberPokemon(randomNumber);
            const number = coins - NUMBER_ONE;
            await UserServices.addPokemon(id, randomNumber.toString());
            await UserServices.changeCountOfMoney(id, number);
            setIsClicked(true);
            dispatch(changeCountOfMoney(coins - NUMBER_ONE))
            addAchives(id, 'countOfPokemons', countOfPokemons, dispatch, ids, t('Notification.pokemons'), addCountOfPokemons, t);
            addAchives(id, 'countOfLoseCoins', countOfLoseCoins, dispatch, ids, t('Notification.loseCoins'), addCountOfLoseCoins, t);
        } else{
            dispatch(changeCountOfMoney(coins + NUMBER_ONE))
            const number = coins + NUMBER_ONE;
            await UserServices.changeCountOfMoney(id, number);
            errorNotification(t('You have this pokemon you get 1 more coin'))
        }
    }
}

export const handleBuyPotions = async (idPotions: number, coins: number, arrPotions: Potions[], dispatch: Dispatch<AnyAction>, id: string, countOfLoseCoins: number, ids: number[], t: Function) =>{
    if(isMoreOneCoin(coins)){
        const updatedArrPotions = JSON.parse(JSON.stringify(arrPotions));
        let index = 0;
        if(arrPotions.findIndex(item => item.id.toString() === idPotions.toString()) !== -1){
            index = arrPotions.findIndex(item => item.id === idPotions);
            const updateCount = updatedArrPotions[index].count + NUMBER_ONE;
            updatedArrPotions[index].count = updateCount;
        } else {
            index = POTIONS.findIndex(item => item.id === idPotions);
            updatedArrPotions?.push(POTIONS[index]);
        }
        dispatch(setPotions(updatedArrPotions));
        dispatch(changeCountOfMoney(coins - NUMBER_ONE));
        addAchives(id, 'countOfLoseCoins', countOfLoseCoins, dispatch, ids, t('Notification.loseCoins'), addCountOfLoseCoins, t);
        await UserServices.setPotions(id, updatedArrPotions);
        await UserServices.changeCountOfMoney(id, coins - NUMBER_ONE);
    }
}
