import {IconPokemon} from "@/IconPokemon/iconPokemon";
import {Tooltip} from "@mui/material";
import Image from "next/image";
import React from "react";
import {InitialPokemon} from "@/constants/types";

export const PokemonInfo = ({selectedPokemon, userHp, statsPokemon, userAttack, userSpeed}: {selectedPokemon: string, userHp: number, statsPokemon: InitialPokemon, userAttack: number, userSpeed: number}) =>{

    return <div className='flex flex-col items-center'>
        <IconPokemon id={selectedPokemon}/>
        <div className='flex'>
            <Tooltip title={`You have ${userHp}`}>
                <div className='flex items-center mr-5'>
                    <Image width={30} height={30} src='/Heart_corazón.svg.png'
                           alt='1.svg'/> <p className='pl-3'>Hp: {statsPokemon.sumaryHp}</p>
                </div>
            </Tooltip>
            <Tooltip title={`You have ${userAttack}`}>
                <div className='flex items-center'>
                    <Image width={30} height={30} src='/8037103.png' alt='8037103.png'/>
                    <p className='pl-3'>Attack: {statsPokemon.sumaryAttack}</p>
                </div>
            </Tooltip>
            <Tooltip title={`You have ${userSpeed}`}>
                <div className='flex items-center ml-5'>
                    <Image width={30} height={30} src='/download.png'
                           alt='download.png'/><p
                    className='pl-3'>Speed: {statsPokemon.speed}</p></div>
            </Tooltip>
        </div>
    </div>
}
