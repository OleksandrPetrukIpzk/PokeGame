import {toast} from "react-toastify";
import axios from "axios";
import {COUNT_OF_POKEMONS, DEFAULT_IMAGE, DEFAULT_LINK, NUMBER_ONE, NUMBER_ZERO} from "@/constants/pokemons";
import {Dispatch, SetStateAction} from "react";
import {checkTypes} from "@/functions/figts";
import {ArenaFightT, FighterT} from "@/constants/types";

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


export const isHit = (yourPokemon:FighterT, enemyPokemon:FighterT) =>{
    return yourPokemon.sumaryHp - enemyPokemon.sumaryAttack > NUMBER_ZERO && enemyPokemon.sumaryHp - yourPokemon.sumaryAttack > NUMBER_ZERO
}
export const isYouLose= (yourPokemon:FighterT, enemyPokemon:FighterT) => {
    return yourPokemon.sumaryHp - enemyPokemon.sumaryAttack <= NUMBER_ZERO
}

export const isYouWin = (yourPokemon:FighterT, enemyPokemon:FighterT) => {
    return enemyPokemon.sumaryHp - yourPokemon.sumaryAttack <= 0
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

export const hit = (setYourPokemon: Dispatch<SetStateAction<ArenaFightT>>, setEnemyPokemon: Dispatch<SetStateAction<ArenaFightT>>, yourAttack: number, enemyAttack: number) =>{
    setYourPokemon((prev: ArenaFightT) => {
        return {
            ...prev,
            sumaryHp: prev.sumaryHp - enemyAttack
        }
    })
    setEnemyPokemon((prev: ArenaFightT) => {
        return {
            ...prev,
            sumaryHp: prev.sumaryHp - yourAttack
        }
    })
}
export const hitThree = (setYourPokemon: Dispatch<SetStateAction<FighterT[]>>, activeId: number, setEnemyPokemon: Dispatch<SetStateAction<FighterT[]>>, yourAttack: number, enemyAttack: number, enemyActiveid: number) =>{
    setYourPokemon((prev: FighterT[]) => {
        return prev.map((item: FighterT, id: number) =>
            activeId === id ?  {
                ...item,
                sumaryHp: item.sumaryHp - enemyAttack
            } : item
        )
    })
    setEnemyPokemon((prev: FighterT[]) => {
        return prev.map((item: FighterT, id: number) =>
            enemyActiveid === id ?  {
                ...item,
                sumaryHp: item.sumaryHp - yourAttack
            } : item
        )
    })
}

export const youLose = (setYourPokemon: Dispatch<SetStateAction<FighterT>>, setEnemyPokemon: Dispatch<SetStateAction<FighterT>>, yourAttack: number) =>{
    setYourPokemon((prev: FighterT) => {
        return {
            ...prev,
            sumaryHp: NUMBER_ZERO
        }
    })
    setEnemyPokemon((prev: FighterT) => {
        return {
            ...prev,
            sumaryHp: prev.sumaryHp - yourAttack
        }
    })
}

export const youLoseThree = (setYourPokemon: Dispatch<SetStateAction<FighterT[]>>, activeId: number, activeEnemyId: number, setEnemyPokemon: Dispatch<SetStateAction<FighterT[]>>, yourAttack: number) =>{
    setYourPokemon((prev: FighterT[]) => {
        return prev.map((item: FighterT, id: number) =>
            activeId === id ?  {
                ...item,
                sumaryHp: NUMBER_ZERO
            } : item
        )
    })
    setEnemyPokemon((prev: FighterT[]) => {
        return prev.map((item: FighterT, id: number) =>
            activeEnemyId === id ?  {
                ...item,
                sumaryHp: item.sumaryHp - yourAttack
            } : item
        )
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

export const youWinThree = (setYourPokemon: Dispatch<SetStateAction<FighterT[]>>, setEnemyPokemon: Dispatch<SetStateAction<FighterT[]>>, enemyAttack: number, activeId: number, activeEnemyId: number) =>{
    setYourPokemon((prev: FighterT[]) => {
        return prev.map((item: FighterT, id: number) =>
            activeId === id ?  {
                ...item,
                sumaryHp: item.sumaryHp - enemyAttack
            } : item
        )
    })
    setEnemyPokemon((prev: FighterT[]) => {
        return prev.map((item: FighterT, id: number) =>
            activeEnemyId === id ?  {
                ...item,
                sumaryHp: NUMBER_ZERO
            } : item
        )
    })
}

export const isBiggest = (first: number, second: number) =>{
    return first > second
}
export const getPokemonImg = async (pokemon: string, setPokemonImg: Dispatch<SetStateAction<string>>, setPokemonName: Dispatch<SetStateAction<string>>) => {
    try{
       const resolve = await axios.get(DEFAULT_LINK + 'pokemon/' + pokemon)
        const img = checkCurrentImage(resolve.data.sprites);
         setPokemonImg(img)
        setPokemonName(resolve.data.name)
    }
    catch (e) {

    }
}
export const configurePokemons = (setEnemyPokemon: Dispatch<SetStateAction<any>>, setYourPokemon: Dispatch<SetStateAction<any>>, selectedPokemon: string, stageInOfflineArena: number) =>{
    axios.get(DEFAULT_LINK + 'pokemon/' + stageInOfflineArena).then(resolve => {
        setEnemyPokemon({
            name: resolve.data.name,
            img: checkCurrentImage(resolve.data.sprites),
            sumaryHp: (resolve.data.stats[0].base_stat * resolve.data.stats[2].base_stat) * (resolve.data.stats[4].base_stat / 2),
            sumaryAttack: resolve.data.stats[1].base_stat * resolve.data.stats[3].base_stat,
            speed: resolve.data.stats[5]?.base_stat,
            types: resolve.data.types
        })
    })
    if(selectedPokemon) {
        axios.get(DEFAULT_LINK + 'pokemon/' + selectedPokemon).then((resolve: any) => {
            setYourPokemon({
                name: resolve.data.name,
                img: checkCurrentImage(resolve.data.sprites),
                sumaryHp: (resolve.data.stats[0].base_stat * resolve.data.stats[2].base_stat) * (resolve.data.stats[4].base_stat / 2),
                sumaryAttack: resolve.data.stats[1].base_stat * resolve.data.stats[3].base_stat,
                specialAttack: resolve.data.stats[3].base_stat,
                specialDefence: resolve.data.stats[4].base_stat,
                speed: resolve.data.stats[5]?.base_stat,
                types: resolve.data.types
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

export const scaleDMG = (enemyPokemon: any, yourPokemon: any, setYourPokemon: Dispatch<SetStateAction<any>>, setEnemyPokemon: Dispatch<SetStateAction<any>>) => {
    let startDmgCurrentUser = 1;
    let startDmgSelectedUser = 1;
    enemyPokemon.types?.forEach((item: any) => {
        yourPokemon.types.forEach((type: any) => {
            startDmgCurrentUser *= checkTypes(type.type.name, item.type.name);
            startDmgSelectedUser *= checkTypes(item.type.name, type.type.name);
        })
    })
    setYourPokemon(prev => {
        return{
            ...prev,
            sumaryAttack: prev.sumaryAttack * startDmgCurrentUser
        }
    })
    setEnemyPokemon(prev => {
        return{
            ...prev,
            sumaryAttack: prev.sumaryAttack * startDmgSelectedUser
        }
    })
}
