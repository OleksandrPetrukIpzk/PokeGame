import {toast} from "react-toastify";
import axios from "axios";
import {COUNT_OF_POKEMONS, DEFAULT_IMAGE, DEFAULT_LINK, NUMBER_ONE, NUMBER_ZERO} from "@/constants/pokemons";
import React, {Dispatch, SetStateAction} from "react";

export const errorNotification = (params = 'Something went wrong') =>{
    return toast.error(params, {position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",})
}

export const  findTypesById = async (id:string) =>{
 const resolve =  await axios.get(DEFAULT_LINK + 'pokemon/' + id)
    return resolve.data.types
}
export const  getPokemonInfoById = async (id:string) =>{
    const resolve =  await axios.get(DEFAULT_LINK + 'pokemon/' + id)
    return resolve.data
}
export const findNamePokemonById = async (id:string) =>{
    const resolve =  await axios.get(DEFAULT_LINK + 'pokemon/' + id)
    return resolve.data.name
}
type Fighter = {
    name: string,
    img: string,
    sumaryHp: number,
    sumaryAttack: number,
    speed: number

}
type HitPokemon = {
    statsCurrentUser: Fighter,
    selectedUser: Fighter,
    setStatsCurrentUser: Dispatch<SetStateAction<object>>,
    setSelectedUser:  Dispatch<SetStateAction<object>>,
    setGameStatus: Dispatch<SetStateAction<string>>,
}
type ChoiceUserForFight = {
    userInfo:Fighter,
    setSelectedUser:  Dispatch<SetStateAction<Fighter>>,
    setIsSelectedUser: Dispatch<SetStateAction<boolean>>
}

export const isHit = (yourPokemon:Fighter, enemyPokemon:Fighter) =>{
    return yourPokemon.sumaryHp - enemyPokemon.sumaryAttack > NUMBER_ZERO && enemyPokemon.sumaryHp - yourPokemon.sumaryAttack > NUMBER_ZERO
}
export const isYouLose= (yourPokemon:Fighter, enemyPokemon:Fighter) => {
    return yourPokemon.sumaryHp - enemyPokemon.sumaryAttack < NUMBER_ZERO
}

export const isYouWin = (yourPokemon:Fighter, enemyPokemon:Fighter) => {
    return enemyPokemon.sumaryHp - yourPokemon.sumaryAttack < 0
}
type CurrentImage = {
    other: {
        home:{
            front_default:string
        }
    }
    front_default: string
}
export const checkCurrentImage = (sprites: CurrentImage) => {
    let currentImage = sprites.other.home.front_default;
    if(!currentImage){
        currentImage = sprites.front_default;
    }
    if(!currentImage){
        currentImage = DEFAULT_IMAGE;
    }
    return currentImage
}

export const isIncludesPokemon = (arrPokemons:string[], randomNumber:number) =>{
    return !arrPokemons.includes(randomNumber.toString())
}
export const randomPokemonNumber = () => {
    return Math.floor(Math.random() * COUNT_OF_POKEMONS) + NUMBER_ONE
}

export const isMoreOneCoin = (coins:number) =>{
    return coins > NUMBER_ZERO
}