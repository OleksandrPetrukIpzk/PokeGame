import {Fighter} from "@/constants/pokemons";

export type OnlineFighters  = Fighter & {
    selectedPokemon: string,
    userName: string,
    data: any
}
