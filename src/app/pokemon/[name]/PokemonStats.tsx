import Image from "next/image";
import React from "react";
import {useTranslate} from "@tolgee/react";

export const PokemonStats = ({pokemonInfo}: {pokemonInfo: Record<string, number> }) =>{
    const {t} = useTranslate()
    return <div>
        <p className='pokemon-name mt-10' style={{color: '#B8B8B8'}}>{t('Pokemon.stats')}</p>
    <div className='flex items-center mb-3'>
        <Image width={30} height={30} src='/Heart_corazón.svg.png' alt='1.svg'/>
        <p className='pl-3'>{t('Arena.hp')} {pokemonInfo.hp}</p>
    </div>
    <div className='flex items-center mb-3'>
        <Image width={30} height={30} src='/8037103.png' alt='8037103.png'/>
    <p className='pl-3'>{t('Arena.attack')} {pokemonInfo.attack}</p></div>
    <div className='flex items-center mb-3'><Image width={30} height={30} src='/306771.png' alt='8037103.png'/>
    <p className='pl-3'>{t('Pokemon.defence')} {pokemonInfo.defense}</p></div>
    <div className='flex items-center mb-3'>
        <Image width={30} height={30} src='/3969028-200.png' alt='8037103.png'/>
        <p className='pl-3'>{t('Pokemon.specialAttack')} {pokemonInfo.specialAttack}</p></div>
    <div className='flex items-center mb-3'>
        <Image width={30} height={30} src='/defense-icon-435x512-f1cww4u8.png' alt='8037103.png'/>
    <p className='pl-3'>{t('Pokemon.specialDefence')} {pokemonInfo.specialDefense}</p></div>
    <div className='flex items-center mb-3'>
        <Image width={30} height={30} src='/download.png' alt='download.png'/>
        <p className='pl-3'>{t('Arena.speed')} {pokemonInfo.speed}</p></div>
    </div>
}
