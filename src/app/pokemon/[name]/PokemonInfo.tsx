import React from "react";
import {BlockStats} from "@/app/pokemon/[name]/BlockStats";
import {PokemonStats} from "@/app/pokemon/[name]/PokemonStats";
import {useTranslate} from "@tolgee/react";

export const PokemonInfo = ({pokemonInfo}: {pokemonInfo: any}) =>{
    const {t} = useTranslate()
    return (<><p className='pokemon-name'>{pokemonInfo.name}</p>
        <p className='pokemon-name' style={{color: '#B8B8B8'}}>{t('Pokemon.about')}</p>
       <BlockStats pokemonInfo={pokemonInfo}/>
        <PokemonStats pokemonInfo={pokemonInfo}/>
    </>)
}
