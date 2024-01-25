import {WIN} from "@/constants/pokemons";

export const GameStatus = ({gameStatus}: {gameStatus: string}) =>{
    return  (<div>
        <p>{!gameStatus ? 'Fight' : 'Finish game'}</p>
        {gameStatus && <p>{gameStatus === WIN ? 'You win' : 'You lose'}</p>}
    </div>)
}
