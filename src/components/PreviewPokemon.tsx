import Image from "next/image";
import {Abilities} from "@/components/abilities";
import React from "react";
import {Fighter} from "@/constants/pokemons";
import {useTranslate} from "@tolgee/react";
import {useWindowSize} from "@/hooks/useWindowSize";

type PreviewPokemonT = {
    pokemon: Fighter
}

export const PreviewPokemon = ({pokemon}: PreviewPokemonT ) =>{
    const {t} = useTranslate();
    const {isMobile} = useWindowSize();
    return <div className='flex flex-col items-center'>
        <p className='text-lg'>{t('Arena.it')} {pokemon.name}</p>
        <Image src={pokemon.img ? pokemon.img : '' } alt={pokemon.name} width={isMobile ? 100 : 200} height={isMobile ? 100 : 200}/>
        <div className={isMobile ? 'flex flex-col mt-5' : 'flex mt-5'}>
            <div className='flex  items-center mr-5'>
                <Image width={isMobile ? 15 : 30} height={isMobile ? 15 : 30} src='/Heart_corazón.svg.png' alt='Symbol hearth'/>
                <p className='pl-3'>{t('Arena.hp')} {pokemon.sumaryHp}</p>
            </div>
            <div className='flex items-center'>
                <Image width={isMobile ? 15 : 30} height={isMobile ? 15 : 30} src='/8037103.png' alt='Symbol swoard'/>
                <p className='ml-3'>{t('Arena.attack')} {pokemon.sumaryAttack}</p>
            </div>
            <div className='flex items-center ml-5'>
                <Image width={isMobile ? 15 : 30} height={isMobile ? 15 : 30} src='/download.png' alt='Symbol legs'/>
                <p className='ml-3'>{t('Arena.speed')} {pokemon.speed}</p></div>
        </div>
        <div className='flex items-center'>
            <p className='my-3'>{t('Arena.typesOfPokemon')}</p>
            <Abilities types={pokemon.types ? pokemon.types : []} isLoaded={false}/>
        </div>
    </div>
}
