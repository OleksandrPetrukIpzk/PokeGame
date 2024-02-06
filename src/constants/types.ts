import {Fighter} from "@/constants/pokemons";

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
