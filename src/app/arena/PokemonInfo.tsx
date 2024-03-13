import {IconPokemon} from "@/IconPokemon/iconPokemon";
import {Tooltip} from "@mui/material";
import Image from "next/image";
import React from "react";
import {InitialPokemon} from "@/constants/types";
import {useTranslate} from "@tolgee/react";

export const PokemonInfo = ({selectedPokemon, userHp, statsPokemon, userAttack, userSpeed}: {selectedPokemon: string, userHp: number, statsPokemon: InitialPokemon, userAttack: number, userSpeed: number}) =>{
    const { t } = useTranslate();
    return <div className='flex flex-col items-center'>
        <IconPokemon id={selectedPokemon} size={100}/>
        <div className='flex'>
            <Tooltip title={t('Arena.alert') + ` ${userHp}`}>
                <div className='flex items-center mr-5'>
                    <Image width={30} height={30} src='/Heart_corazón.svg.png'
                           alt='1.svg'/> <p className='pl-3'>{t('Arena.hp')} {statsPokemon.sumaryHp}</p>
                </div>
            </Tooltip>
            <Tooltip title={t('Arena.alert') + ` ${userAttack}`}>
                <div className='flex items-center'>
                    <Image width={30} height={30} src='/8037103.png' alt='8037103.png'/>
                    <p className='pl-3'>{t('Arena.attack')} {statsPokemon.sumaryAttack}</p>
                </div>
            </Tooltip>
            <Tooltip title={t('Arena.alert') + ` ${userSpeed}`}>
                <div className='flex items-center ml-5'>
                    <Image width={30} height={30} src='/download.png'
                           alt='download.png'/>
                    <p className='pl-3'>{t('Arena.speed')} {statsPokemon.speed}</p></div>
            </Tooltip>
        </div>
    </div>
}
