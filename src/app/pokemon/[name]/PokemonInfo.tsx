import React from "react";
import {BlockStats} from "@/app/pokemon/[name]/BlockStats";
import {PokemonStats} from "@/app/pokemon/[name]/PokemonStats";

export const PokemonInfo = ({pokemonInfo}: {pokemonInfo: any}) =>{
    return (<><p className='pokemon-name'>{pokemonInfo.name}</p>
        <p className='pokemon-name' style={{color: '#B8B8B8'}}>About</p>
       <BlockStats pokemonInfo={pokemonInfo}/>
        <PokemonStats pokemonInfo={pokemonInfo}/>
    </>)
}
