import Image from "next/image";
import {Fighter} from "@/constants/pokemons";

export const Fighters = ({yourPokemon, enemyPokemon}: {yourPokemon:Fighter, enemyPokemon:Fighter}) =>{
    return(<div className='flex justify-between'>
        <div>
            <p>{yourPokemon.sumaryHp}</p>
            <Image src={yourPokemon.img} alt={yourPokemon.img} width={100} height={100}/>
        </div>
        <p>VS</p>
        <div>
            <p>{enemyPokemon.sumaryHp}</p>
            <Image src={enemyPokemon.img} alt={enemyPokemon.img} width={100} height={100}/>
        </div>
    </div>)
}
