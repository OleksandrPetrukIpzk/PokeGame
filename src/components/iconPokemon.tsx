'use client'
import {useEffect, useState} from "react";
import axios from "axios";
import {DEFAULT_IMAGE, DEFAULT_LINK, EMPTY_STRING} from "@/constants/pokemons";
import Image from "next/image";
import {isNumber} from "@mui/base/unstable_useNumberInput/utils";
type IconPokemon = {
    id: string,
    size: number,
    hp?: number,
    isMyPokemon?: boolean
}

export const IconPokemon = ({id, size, hp, isMyPokemon}:IconPokemon) =>{
    const [iconPokemon, setIconPokemon] = useState(EMPTY_STRING);
    useEffect(() => {
        axios.get(DEFAULT_LINK + 'pokemon/' + id).then(info => {
            let currentImage = info.data.sprites.other.home.front_default;
            if(!currentImage){
                currentImage = info.data.sprites.front_default;
            }
            if(!currentImage){
                currentImage = DEFAULT_IMAGE;
            }
            setIconPokemon(currentImage);
        })
    }, [id]);
    return(<Image className={isNumber(hp) && hp <= 0 && 'dead__pokemon' || ``} id={isMyPokemon === undefined  ? 'icon' : isMyPokemon ?`pokemon__left` : `pokemon__right`} src={iconPokemon} alt={iconPokemon} width={size} height={size}/>)
}
