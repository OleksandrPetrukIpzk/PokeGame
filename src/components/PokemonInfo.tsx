import {IconPokemon} from "@/components/iconPokemon";
import {Tooltip} from "@mui/material";
import Image from "next/image";
import React from "react";
import {InitialPokemon} from "@/constants/types";
import {useTranslate} from "@tolgee/react";
import {useWindowSize} from "@/hooks/useWindowSize";

type PokemonInfoT = {
    selectedPokemon: string,
    userHp: number,
    statsPokemon: InitialPokemon,
    userAttack: number,
    userSpeed: number
}

export const PokemonInfo = ({selectedPokemon, userHp, statsPokemon, userAttack, userSpeed}: PokemonInfoT) =>{
    const { t } = useTranslate();
    const {isMobile} = useWindowSize();
    return <div className='flex flex-col items-center'>
        <IconPokemon id={selectedPokemon} size={isMobile ? 70 : 100}/>
        <div className={isMobile ? 'flex flex-col'  : 'flex' }>
            <Tooltip title={t('Arena.alert') + ` ${userHp}`}>
                <div className='flex items-center mr-5'>
                    <Image width={isMobile ? 15 : 30} height={isMobile ? 15 : 30} src='/Heart_corazón.svg.png'
                           alt='Sumbol Hearth'/> <p className='pl-3'>{t('Arena.hp')} {statsPokemon.sumaryHp}</p>
                </div>
            </Tooltip>
            <Tooltip title={t('Arena.alert') + ` ${userAttack}`}>
                <div className='flex items-center'>
                    <Image width={isMobile ? 15 : 30} height={isMobile ? 15 : 30} src='/8037103.png' alt='Symbol sword'/>
                    <p className='pl-3'>{t('Arena.attack')} {statsPokemon.sumaryAttack}</p>
                </div>
            </Tooltip>
            <Tooltip title={t('Arena.alert') + ` ${userSpeed}`}>
                <div className='flex items-center ml-5'>
                    <Image width={isMobile ? 15 : 30} height={isMobile ? 15 : 30} src='/download.png'
                           alt='Symbol legs'/>
                    <p className='pl-3'>{t('Arena.speed')} {statsPokemon.speed}</p></div>
            </Tooltip>
        </div>
    </div>
}
