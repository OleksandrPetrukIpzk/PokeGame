import {COLOR_OF_ABILITIES} from "@/constants/pokemons";
import {AbilitiesType, Ability} from "@/constants/types";


export const Abilities = ({types, isLoaded}:AbilitiesType) =>{
    return(
        <>
        {!isLoaded && <div className='flex text-center'>
            {types.map((type: Ability) => {
                return <div className='ml-3 pl-2 pr-2 rounded-full text-center' style={{background: `${isLoaded  ? 'black' : COLOR_OF_ABILITIES[type.type?.name]}`}}><p className='types-text'>{type.type?.name}</p></div>;
            })}
        </div>}
        </>
    )
}
