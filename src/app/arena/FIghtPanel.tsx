import {IconPokemon} from "@/IconPokemon/iconPokemon";
import {OnlineFighters} from "@/constants/types";

export const FightPanel = ({statsCurrentUser, selectedPokemon, selectedUser}: {statsCurrentUser: OnlineFighters, selectedPokemon: string, selectedUser: OnlineFighters}) =>{
    return <div className='flex justify-between '>
        <div> <p className='text-white text-lg'>❤️ {statsCurrentUser.sumaryHp}</p>
            <IconPokemon id={selectedPokemon}/>  </div>
        <div>
            <p className='text-white text-lg'>❤️ {selectedUser.sumaryHp}</p>
            <IconPokemon id={selectedUser.selectedPokemon}/>
        </div>
    </div>
}
