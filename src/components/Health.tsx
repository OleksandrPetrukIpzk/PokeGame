import {IconPokemon} from "@/components/iconPokemon";

type HealthT = {
    sumaryHp: number,
    selectedPokemon: string
}

export const Health = ({sumaryHp, selectedPokemon}: HealthT) =>{
    return(<div>
        <p className='text-white text-lg'>❤️ {sumaryHp}</p>
        <IconPokemon id={selectedPokemon} size={100}/>
    </div>)
}
