'use client'
import {IconPokemon} from "@/IconPokemon/iconPokemon";
import Button from '@mui/joy/Button';
import Image from "next/image";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {DEFAULT_LINK} from "@/constants/pokemons";
import {Tooltip} from "@mui/material";

type CreatedUserArena = {
    name: string,
    selectedPokemon: string,
    coins: number,
    email: string,
    choiceUserForFight: Function,
    userAttack: number,
    userHp: number,
    userSpeed: number
}
export const User = ({name, selectedPokemon,coins, email, choiceUserForFight, userAttack, userHp, userSpeed}: CreatedUserArena) =>{

    const [statsPokemon, setStatsPokemon] = useState({
        sumaryHp: 0,
        sumaryAttack: 0,
        speed: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            if(selectedPokemon){
                axios.get(DEFAULT_LINK + 'pokemon/' + selectedPokemon).then((userDetailInfo) => {
                    setStatsPokemon((prev) => ({
                        sumaryHp: (userDetailInfo.data.stats[0].base_stat * userDetailInfo.data.stats[2].base_stat) * (userDetailInfo.data.stats[4].base_stat / 2),
                        sumaryAttack: userDetailInfo.data.stats[1].base_stat * userDetailInfo.data.stats[3].base_stat,
                        speed: userDetailInfo.data.stats[5]?.base_stat,
                    }))
                })
            }
        };

        fetchData();
    }, [selectedPokemon]);
    return(<div className='flex justify-between items-center m-6 bg-sky-200 rounded-md py-4 px-4'>
        <div className='flex items-center items-stretch'>
        <IconPokemon id={selectedPokemon}/>
            <div className='flex flex-col justify-around p-5'>
        <p className="">Name: {name}</p>
                <p className=''>Rang: 100</p>
            </div>
        </div>
        <div className='flex flex-col items-center'>
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
        <Button  color="danger" size="lg"
                variant="soft" onClick={() => choiceUserForFight({userName: name, selectedPokemon, coins, email,})}>Fight</Button>
        </div>)

}
