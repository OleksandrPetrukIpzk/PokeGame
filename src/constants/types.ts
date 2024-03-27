import {EMPTY_STRING, Fighter, NUMBER_ZERO} from "@/constants/pokemons";

export type OnlineFighters  = Fighter & {
    selectedPokemon: string,
    userName: string,
    data: any
}

export interface ColorOfAbilities {
    [key: string]: string;
}

export type AbilitiesType = {
    types: Array<Ability>,
    isLoaded: boolean,
}
export type Ability = {
    type:{
        name: string;
        slot?: number;
        url?: string
    }
}

export type InitialPokemon = {
    sumaryHp: number,
    sumaryAttack: number,
    speed: number,
}

export type Rang = {
    id: number,
    whoStart: string,
    whoDefence: string,
    whoWin: string,
    timeFight: Date
}

export type TypeForBackDrop = {
    type: {
        name: string
    }
}

export type PokemonsByFilterT = {
    pokemon: {
        name: string,
        pokemon: object
    }
}

export type TypesT = {
    name: string,
}

export type PokemonDetailInfoT = {
    id: string,
    name: string,
    weight: number,
    height: number,
    hp: number,
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number,
    photoURL: string,
    altPhotoURL: string,
    types: Ability
}

export type EvolutionT = {
    id: number,
    level: number,
    pokemon: {
        url: string,
        name: string

    }
}

export type FighterT = {
    name: string,
    sumaryAttack: number,
    speed: number,
    specialAttack: number,
    sumaryHp: number,
    specialDefence: number,
    types: Ability[],
}

type StatsT = {
    base_stat: number
}

export type ArenaFightT = {
    id: string,
    email: string,
    name: string,
    coins: number,
    selectedPokemon: string,
    sumaryAttack: number,
    sumaryHp: number,
    speed: number,
    userName: string,
    rang: number,
    types: Ability[]
    specialAttack: number,
    specialDefence: number
}
