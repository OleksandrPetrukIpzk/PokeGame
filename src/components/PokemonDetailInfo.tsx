import React from "react";
import {BlockStats} from "@/components/BlockStats";
import {PokemonStats} from "@/components/PokemonStats";
import {useTranslate} from "@tolgee/react";

export const PokemonDetailInfo = ({pokemonInfo}: {pokemonInfo: any}) =>{
    const {t} = useTranslate()
    return (<><p className='pokemon-name'>{pokemonInfo.name}</p>
        <p className='pokemon-name' style={{color: '#B8B8B8'}}>{t('Pokemon.about')}</p>
       <BlockStats pokemonInfo={pokemonInfo}/>
        <PokemonStats pokemonInfo={pokemonInfo}/>
    </>)
}
