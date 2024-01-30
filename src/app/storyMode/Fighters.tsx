import Image from "next/image";
import {Fighter} from "@/constants/pokemons";
import {IconPokemon} from "@/IconPokemon/iconPokemon";

export const Fighters = ({yourPokemon, enemyPokemon}: {yourPokemon:Fighter, enemyPokemon:Fighter}) =>{
    return(<div className='flex justify-between '>
        <div> <p className='text-white text-lg'>❤️ {yourPokemon.sumaryHp}</p>
            <IconPokemon id={yourPokemon.name}/>  </div>
        <div>
            <p className='text-white text-lg'>❤️ {enemyPokemon.sumaryHp}</p>
            <IconPokemon id={enemyPokemon.name}/>
        </div>
    </div>)
}
