export type Potions = {
    id: number,
    name: string,
    count: number
}
export interface IUser {
    _id: string,
    id: string;
    name: string;
    email: string;
    password: string;
    img: string;
    selectedPokemon: string;
    coins: number;
    rang: number;
    stageInOfflineArena: number;
    arrPokemons: string[];
    arrAchives: number[];
    arrPotions: Potions[];
}
