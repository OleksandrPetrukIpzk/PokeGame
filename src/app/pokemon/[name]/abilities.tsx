import {COLOR_OF_ABILITIES} from "@/constants/pokemons";
import {AbilitiesType, Ability} from "@/constants/types";


export const Abilities = ({types, isLoaded}:AbilitiesType) =>{
    return(
        <>
        {!isLoaded && <div className='flex flex-col text-center'>
            {types.map((type: Ability) => {
                return <p className=' mb-3 pl-2 pr-2 rounded-full types-text text-center' style={{background: `${isLoaded  ? 'black' : COLOR_OF_ABILITIES[type.type?.name]}`}}>{type.type?.name}</p>;
            })}
        </div>}
        </>
    )
}
