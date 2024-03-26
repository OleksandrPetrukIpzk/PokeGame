import {Fighter} from "@/constants/pokemons";
import {Health} from "@/components/Health";

type FightersT = {
    yourPokemon:Fighter,
    enemyPokemon:Fighter
}

export const Fighters = ({yourPokemon, enemyPokemon}: FightersT) =>{
    return(
        <div className='flex justify-between '>
            <Health sumaryHp={yourPokemon.sumaryHp} selectedPokemon={yourPokemon.name}/>
            <Health sumaryHp={enemyPokemon.sumaryHp} selectedPokemon={enemyPokemon.name}/>
    </div>)
}
