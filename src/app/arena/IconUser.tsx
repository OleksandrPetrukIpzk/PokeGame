import {IconPokemon} from "@/IconPokemon/iconPokemon";
import React from "react";

export const IconUser = ({selectedPokemon, name}: {selectedPokemon: string, name: string}) =>{

    return <div className='flex items-center items-stretch'>
        <IconPokemon id={selectedPokemon}/>
        <div className='flex flex-col justify-around p-5'>
            <p className="">Name: {name}</p>
            <p className=''>Rang: 100</p>
        </div>
    </div>
}
