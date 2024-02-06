'use client'
import Button from '@mui/joy/Button';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {DEFAULT_LINK, INITIAL_POKEMON} from "@/constants/pokemons";
import {IconUser} from "@/app/arena/IconUser";
import {PokemonInfo} from "@/app/arena/PokemonInfo";

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
export const User = ({name, selectedPokemon, coins, email, choiceUserForFight, userAttack, userHp, userSpeed}: CreatedUserArena) =>{

    const [statsPokemon, setStatsPokemon] = useState(INITIAL_POKEMON);
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
       <IconUser selectedPokemon={selectedPokemon} name={name}/>
        <PokemonInfo selectedPokemon={selectedPokemon} userHp={userHp} statsPokemon={statsPokemon} userAttack={userAttack} userSpeed={userSpeed}/>
        <Button  color="danger" size="lg"
                variant="soft" onClick={() => choiceUserForFight({userName: name, selectedPokemon, coins, email,})}>Fight</Button>
        </div>)

}
