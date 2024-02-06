import {Fighter} from "@/constants/pokemons";
import {Health} from "@/app/arena/Health";

export const Fighters = ({yourPokemon, enemyPokemon}: {yourPokemon:Fighter, enemyPokemon:Fighter}) =>{
    return(
        <div className='flex justify-between '>
            <Health sumaryHp={yourPokemon.sumaryHp} selectedPokemon={yourPokemon.name}/>
            <Health sumaryHp={enemyPokemon.sumaryHp} selectedPokemon={enemyPokemon.name}/>
    </div>)
}
