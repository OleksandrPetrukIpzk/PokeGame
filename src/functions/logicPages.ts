import {isTheSame} from "@/functions/logic";
import {WIN} from "@/constants/pokemons";

export const ifYouWin = (gameStatus: string) =>{
    return isTheSame(gameStatus, WIN)  ? 'You win' : 'You lose'
}

export const ifTheFight = (gameStatus: string) =>{
    return !gameStatus && 'Fight'
}
