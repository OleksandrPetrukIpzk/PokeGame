import {OnlineFighters} from "@/constants/types";
import {Health} from "@/components/Health";

export const FightPanel = ({statsCurrentUser, selectedPokemon, selectedUser}: {statsCurrentUser: OnlineFighters, selectedPokemon: string, selectedUser: OnlineFighters}) =>{
    return <div className='flex justify-between '>
        <Health sumaryHp={statsCurrentUser.sumaryHp} selectedPokemon={selectedPokemon}/>
        <Health sumaryHp={selectedUser.sumaryHp} selectedPokemon={selectedUser.selectedPokemon}/>
    </div>
}
