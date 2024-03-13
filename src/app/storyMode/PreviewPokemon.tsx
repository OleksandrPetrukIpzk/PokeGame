import Image from "next/image";
import {Abilities} from "@/app/pokemon/[name]/abilities";
import React from "react";
import {Fighter} from "@/constants/pokemons";
import {useTranslate} from "@tolgee/react";

export const PreviewPokemon = ({pokemon}: {pokemon: Fighter} ) =>{
    const {t} = useTranslate();
    return <div className='flex flex-col items-center'>
        <p className='text-lg'>{t('Arena.it')} {pokemon.name}</p>
        <Image src={pokemon.img} alt={pokemon.img} width={200} height={200}/>
        <div className='flex mt-5'>
            <div className='flex  items-center mr-5'>
                <Image width={30} height={30} src='/Heart_corazón.svg.png' alt='1.svg'/>
                <p className='pl-3'>{t('Arena.hp')} {pokemon.sumaryHp}</p>
            </div>
            <div className='flex items-center'>
                <Image width={30} height={30} src='/8037103.png' alt='8037103.png'/>
                <p className='ml-3'>{t('Arena.attack')} {pokemon.sumaryAttack}</p>
            </div>
            <div className='flex items-center ml-5'>
                <Image width={30} height={30} src='/download.png' alt='download.png'/>
                <p className='ml-3'>{t('Arena.speed')} {pokemon.speed}</p></div>
        </div>
        <div className='flex items-center'>
            <p className='my-3'>{t('Arena.typesOfPokemon')}</p>
            <Abilities types={pokemon?.types} isLoaded={false}/>
        </div>
    </div>
}
