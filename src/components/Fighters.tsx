import {Health} from "@/components/Health";
import {FighterT} from "@/constants/types";

type FightersT = {
    yourPokemon:FighterT,
    enemyPokemon:FighterT
}

export const Fighters = ({yourPokemon, enemyPokemon}: FightersT) =>{
    return(
        <div className='flex justify-between '>
            <Health isMyPokemon={true} sumaryHp={yourPokemon.sumaryHp} selectedPokemon={yourPokemon.name}/>
            <Health isMyPokemon={false} sumaryHp={enemyPokemon.sumaryHp} selectedPokemon={enemyPokemon.name}/>
    </div>)
}
