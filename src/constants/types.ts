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
