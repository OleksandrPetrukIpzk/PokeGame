import Image from "next/image";
import {Button, Tooltip} from "@mui/material";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import {Fighter} from "@/constants/pokemons";
import React, {Dispatch, SetStateAction} from "react";
import {Abilities} from "@/app/pokemon/[name]/abilities";

export const FightersPreview = ({yourPokemon, setIsFight, isFight, enemyPokemon}: {yourPokemon: Fighter, setIsFight: Dispatch<SetStateAction<boolean>>, isFight: boolean, enemyPokemon: Fighter}) => {
    return <div className='flex justify-around'>
        <div className='flex flex-col items-center'>
            <p className='text-lg'>It`s {yourPokemon.name}</p>
            <Image src={yourPokemon.img} alt={yourPokemon.img} width={200} height={200}/>
            <div className='flex mt-5'>
                    <div className='flex  items-center mr-5'>
                        <Image width={30} height={30} src='/Heart_corazón.svg.png'
                               alt='1.svg'/> <p className='pl-3'>Hp: {yourPokemon.sumaryHp}</p>
                    </div>
                    <div className='flex items-center'>
                        <Image width={30} height={30} src='/8037103.png' alt='8037103.png'/>
                        <p className='ml-3'>Attack: {yourPokemon.sumaryAttack}</p>
                    </div>
                    <div className='flex items-center ml-5'>
                        <Image width={30} height={30} src='/download.png'
                               alt='download.png'/><p
                        className='ml-3'>Speed: {yourPokemon.speed}</p></div>
            </div>
            <div className='flex items-center'>
            <p className='my-3'>Types:</p> <Abilities types={yourPokemon?.types} isLoaded={false}/>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center'>
            {!isFight && <Button  variant="contained" endIcon={<SportsKabaddiIcon/>} onClick={() => setIsFight(true)}>Fight</Button>}
        </div>
        <div className='flex flex-col items-center'>
            <p className='text-lg'>It`s {enemyPokemon.name}</p>
            <Image src={enemyPokemon.img} alt={yourPokemon.img} width={200} height={200}/>
            <div className='flex mt-5'>
                <Tooltip title={`You have ${yourPokemon.sumaryHp}`}>
                    <div className='flex  items-center mr-5'>
                        <Image width={30} height={30} src='/Heart_corazón.svg.png'
                               alt='1.svg'/> <p className='pl-3'>Hp: {enemyPokemon.sumaryHp}</p>
                    </div>
                </Tooltip>
                <Tooltip title={`You have ${yourPokemon.sumaryHp}`}>
                    <div className='flex items-center'>
                        <Image width={30} height={30} src='/8037103.png' alt='8037103.png'/>
                        <p className='ml-3'>Attack: {enemyPokemon.sumaryAttack}</p>
                    </div>
                </Tooltip>
                <Tooltip title={`You have ${yourPokemon.speed}`}>
                    <div className='flex items-center ml-5'>
                        <Image width={30} height={30} src='/download.png'
                               alt='download.png'/><p
                        className='ml-3'>Speed: {enemyPokemon.speed}</p></div>
                </Tooltip>
            </div>
            <div className='flex  items-center'>
            <p className='my-3'>Types:</p> <Abilities types={enemyPokemon?.types} isLoaded={false}/>
            </div>
        </div>
    </div>
}
