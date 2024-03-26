import React, {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {DEFAULT_IMAGE, DEFAULT_POKEMON_INFO} from "@/constants/pokemons";

export const CardPokemon = ({pokemon, isLoaded}: any): JSX.Element => {
    const [pokemonInfo, setPokemonInfo] = useState(DEFAULT_POKEMON_INFO);
    useEffect(() => {
        axios.get(pokemon?.url).then(info => {
            let currentImage = info.data?.sprites?.other?.home?.front_default;
           if(!currentImage){
               currentImage = info.data?.sprites?.front_default;
           }
           if(!currentImage){
               currentImage = DEFAULT_IMAGE;
           }
           setPokemonInfo({
                    name: info.data.name,
                    height: info.data.height,
                    photoURL: currentImage,
                    altPhotoURL: info.data.sprites?.other.home?.front_default,
                    hp: info.data?.stats[0]?.base_stat,
                    attack: info.data?.stats[1]?.base_stat,
                    defense: info.data?.stats[2]?.base_stat,
                    specialAttack: info.data?.stats[3]?.base_stat,
                    specialDefense: info.data?.stats[4]?.base_stat,
                    speed: info.data?.stats[5]?.base_stat,
                });
            }
        ).catch();
    }, [pokemon]);
    return (
        <>
        {isLoaded &&
            <Link href={'/pokemon/'+pokemonInfo.name} className='flex justify-between w-max flex-col items-center relative mb-20 mr-20'>
             <Image className='relative z-10 image-pocemon' width={200} height={200} src={pokemonInfo.photoURL} decoding={"async"} alt={pokemonInfo.altPhotoURL} loading={'lazy'}/>
            <div className='w-52 absolute h-36 block-gradient z-0 top-16'></div>
            <p className='pt-2 z-10  bg-white text-subtitle h-10'>{pokemonInfo.name}</p>
        </Link>}
        </>
    )
}
