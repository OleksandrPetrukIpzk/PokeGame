import {EMPTY_STRING, NUMBER_ZERO} from "@/constants/pokemons";
import {IUser, Potions} from "@/models/user";

export const INITIAL_USER: IUser = {
    id: EMPTY_STRING,
    name: EMPTY_STRING,
    email: EMPTY_STRING,
    password: EMPTY_STRING,
    img: EMPTY_STRING,
    selectedPokemon: EMPTY_STRING,
    coins: NUMBER_ZERO,
    rang: NUMBER_ZERO,
    stageInOfflineArena: NUMBER_ZERO,
    arrPokemons: [],
    arrAchives: [],
    arrPotions: []
}
