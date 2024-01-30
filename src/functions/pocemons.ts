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

export const youCantLeave = (params = 'You cant leave') => {
    return toast.error(params, {position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",})
}

export const youHaveAchive = (params = '🥇 Congratulation') => {
    return toast.success(params + " 🥇", {position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
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

export const hit = (setYourPokemon: Dispatch<SetStateAction<any>>, setEnemyPokemon: Dispatch<SetStateAction<any>>, yourAttack: number, enemyAttack: number) =>{
    setYourPokemon((prev: any) => {
        return {
            ...prev,
            sumaryHp: prev.sumaryHp - enemyAttack
        }
    })
    setEnemyPokemon((prev: any) => {
        return {
            ...prev,
            sumaryHp: prev.sumaryHp - yourAttack
        }
    })
}

export const youLose = (setYourPokemon: Dispatch<SetStateAction<any>>, setEnemyPokemon: Dispatch<SetStateAction<any>>, yourAttack: number) =>{
    setYourPokemon((prev: any) => {
        return {
            ...prev,
            sumaryHp: NUMBER_ZERO
        }
    })
    setEnemyPokemon((prev: any) => {
        return {
            ...prev,
            sumaryHp: prev.sumaryHp - yourAttack
        }
    })
}

export const youWin = (setYourPokemon: Dispatch<SetStateAction<any>>, setEnemyPokemon: Dispatch<SetStateAction<any>>, enemyAttack: number) =>{
    setYourPokemon((prev: any) => {
        return {
            ...prev,
            sumaryHp: prev.sumaryHp - enemyAttack
        }
    })
    setEnemyPokemon((prev: any) => {
        return {
            ...prev,
            sumaryHp: NUMBER_ZERO
        }
    })
}

export const isBiggest = (first: number, second: number) =>{
    return first > second
}

export const configurePokemons = (setEnemyPokemon: Dispatch<SetStateAction<any>>, setYourPokemon: Dispatch<SetStateAction<any>>, selectedPokemon: string, stageInOfflineArena: number) =>{
    axios.get(DEFAULT_LINK + 'pokemon/' + stageInOfflineArena).then(resolve => {
        setEnemyPokemon({
            name: resolve.data.name,
            img: checkCurrentImage(resolve.data.sprites),
            sumaryHp: (resolve.data.stats[0].base_stat * resolve.data.stats[2].base_stat) * (resolve.data.stats[4].base_stat / 2),
            sumaryAttack: resolve.data.stats[1].base_stat * resolve.data.stats[3].base_stat,
            speed: resolve.data.stats[5]?.base_stat
        })
    })
    if(selectedPokemon) {
        axios.get(DEFAULT_LINK + 'pokemon/' + selectedPokemon).then((resolve: any) => {
            setYourPokemon({
                name: resolve.data.name,
                img: checkCurrentImage(resolve.data.sprites),
                sumaryHp: (resolve.data.stats[0].base_stat * resolve.data.stats[2].base_stat) * (resolve.data.stats[4].base_stat / 2),
                sumaryAttack: resolve.data.stats[1].base_stat * resolve.data.stats[3].base_stat,
                speed: resolve.data.stats[5]?.base_stat
            })
        })
    }
}

export const isRealPokemon = async (randomNumber:number) =>{
    try{
       await axios.get(DEFAULT_LINK + 'pokemon/' + randomNumber)
        return true
    } catch (err){
        return false
    }

}
