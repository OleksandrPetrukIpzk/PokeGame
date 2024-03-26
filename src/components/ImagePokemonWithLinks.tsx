import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {getPokemonImg} from "@/functions/pocemons";
import {EMPTY_STRING} from "@/constants/pokemons";

type ImagePokemonWithLinksT = {
    selectedPokemon: string,
    width: number,
    height: number
}

export const ImagePokemonWithLinks = ({selectedPokemon, width, height}: ImagePokemonWithLinksT) =>{
    const [pokemonImg, setPokemonImg] = useState(EMPTY_STRING);
    const [pokemonName, setPokemonName] =useState(EMPTY_STRING);
    useEffect(() => {
        getPokemonImg(selectedPokemon, setPokemonImg, setPokemonName)
    }, [selectedPokemon]);
    return  <Link href={'/pokemon/' + selectedPokemon} className='text-center items-center'>
        <Image src={pokemonImg} alt={pokemonName} width={width} height={height}/>
        <p>{pokemonName}</p>
    </Link>
}
