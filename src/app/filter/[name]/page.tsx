'use client'
import {useEffect, useState} from "react";
import {Header} from "@/components/Header";
import {CardPokemon} from "@/components/cardPokemon";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {PokemonsByFilterT} from "@/constants/types";
import {getPokemonsByType} from "@/functions/asyncFynctions";
import '../../globals.css'

type Props = {
    params:{
        name: string,
    }
}

export default function Pokemons({params: {name}}: Props) {
    const [listOfPokemons, setListOfPokemons] = useState<PokemonsByFilterT[]>([]);
    useEmptyAuth();
    useEffect(() => {
       getPokemonsByType(name, setListOfPokemons);
    }, []);
    return(
        <div className='main'>
        <Header/>
            <main className='h-max flex justify-center flex-wrap pl-20 pt-10'>
            {listOfPokemons.map(pokemon => <CardPokemon key={pokemon.pokemon?.name} pokemon={pokemon.pokemon} isLoaded={true} />)}
            </main>
            </div>
    )
}
