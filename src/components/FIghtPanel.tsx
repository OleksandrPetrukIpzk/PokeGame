import {ArenaFightT, OnlineFighters} from "@/constants/types";
import {Health} from "@/components/Health";

type FightPanel = {
    statsCurrentUser: ArenaFightT,
    selectedPokemon: string,
    selectedUser: ArenaFightT
}

export const FightPanel = ({statsCurrentUser, selectedPokemon, selectedUser}: FightPanel) =>{
    return <div className='flex justify-between '>
        <Health sumaryHp={statsCurrentUser.sumaryHp} selectedPokemon={selectedPokemon}/>
        <Health sumaryHp={selectedUser.sumaryHp} selectedPokemon={selectedUser.selectedPokemon}/>
    </div>
}
