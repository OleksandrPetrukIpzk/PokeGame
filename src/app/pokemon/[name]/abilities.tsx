import {COLOR_OF_ABILITIES} from "@/constants/pokemons";

type Types = {
    types: Array<Type>,
    isLoaded: boolean,
}
type Type = {
    type:{
        slot: number,
        type:{
            name: string,
            url: string,
        }
    }
}
export const Abilities = ({types, isLoaded}:Types) =>{
    return(
        <>
        {!isLoaded && <div className='flex mb-3'>
            {types.map((type) => {
                return <p className='ml-3 pl-2 pr-2 rounded-full types-text' style={{background: `${isLoaded  ? 'black' : COLOR_OF_ABILITIES[type.type?.name]}`}}>{type.type?.name}</p>;
            })}
        </div>}
        </>
    )
}