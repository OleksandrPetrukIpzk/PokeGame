'use client'
import {useEffect, useState} from "react";
import axios from "axios";
import {DEFAULT_IMAGE, DEFAULT_LINK, EMPTY_STRING} from "@/constants/pokemons";
import Image from "next/image";
type IconPokemon = {
    id: string
}
export const IconPokemon = (id:IconPokemon) =>{
    const [iconPokemon, setIconPokemon] = useState(EMPTY_STRING);
    useEffect(() => {
        axios.get(DEFAULT_LINK + 'pokemon/' + id.id).then(info => {
            let currentImage = info.data.sprites.other.home.front_default;
            if(!currentImage){
                currentImage = info.data.sprites.front_default;
            }
            if(!currentImage){
                currentImage = DEFAULT_IMAGE;
            }
            setIconPokemon(currentImage);
        })
    }, []);
    return(<Image src={iconPokemon} alt={iconPokemon} width={100} height={100}/>)
}
