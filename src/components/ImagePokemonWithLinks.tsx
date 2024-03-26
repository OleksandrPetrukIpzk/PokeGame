import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {getPokemonImg} from "@/functions/pocemons";

export const ImagePokemonWithLinks = ({selectedPokemon, width, height}: {selectedPokemon: string, width: number, height: number}) =>{
    const [pokemonImg, setPokemonImg] = useState('');
    const [pokemonName, setPokemonName] =useState('');
    useEffect(() => {
        getPokemonImg(selectedPokemon, setPokemonImg, setPokemonName)
    }, [selectedPokemon]);
    return  <Link href={'/pokemon/' + selectedPokemon} className='text-center items-center'>
        <Image src={pokemonImg} alt={''} width={width} height={height}/>
        <p>{pokemonName}</p>
    </Link>
}
