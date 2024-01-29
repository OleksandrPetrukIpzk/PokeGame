import {COLOR_OF_ABILITIES} from "@/constants/pokemons";
import {AbilitiesType, Ability} from "@/constants/types";


export const Abilities = ({types, isLoaded}:AbilitiesType) =>{
    console.log(types[0].type);
    return(
        <>
        {!isLoaded && <div className='flex mb-3'>
            {types.map((type: Ability) => {
                return <p className='ml-3 pl-2 pr-2 rounded-full types-text' style={{background: `${isLoaded  ? 'black' : COLOR_OF_ABILITIES[type.type?.name]}`}}>{type.type?.name}</p>;
            })}
        </div>}
        </>
    )
}
