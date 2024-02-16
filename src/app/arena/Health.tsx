import {IconPokemon} from "@/IconPokemon/iconPokemon";

export const Health = ({sumaryHp, selectedPokemon}: {sumaryHp: number, selectedPokemon: string}) =>{
    return(<div>
        <p className='text-white text-lg'>❤️ {sumaryHp}</p>
        <IconPokemon id={selectedPokemon} size={100}/>
    </div>)
}
