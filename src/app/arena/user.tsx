'use client'
import {useAppSelector} from "@/redux/store";
import {IconPokemon} from "@/IconPokemon/iconPokemon";
import {Button} from "@mui/material";

type CreatedUserArena = {
    name: string,
    selectedPokemon: string,
    coins: number,
    email: string,
    choiceUserForFight: void
}
export const User = ({name, selectedPokemon,coins, email, choiceUserForFight}: CreatedUserArena) =>{
    // @ts-ignore
    return(<div className='flex text-center items-center flex-col p-6'>
        <p>{name}</p> <IconPokemon id={selectedPokemon}/> <Button onClick={() => choiceUserForFight({userName: name, selectedPokemon, coins, email,})}>Fight</Button>
    </div>)

}