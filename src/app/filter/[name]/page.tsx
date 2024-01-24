'use client'
import {useEffect, useState} from "react";
import axios from "axios";
import {param} from "ts-interface-checker";
import {Header} from "@/Header/Header";
import '../../globals.css'
import {CardPokemon} from "@/app/cardPokemon";
import {errorNotification} from "@/functions/pocemons";
import {useDispatch} from "react-redux";
import {getAuth} from "@/functions/auth";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";

type Props = {
    params:{
        name: string,
    }
}
export default function Pokemons({params: {name}}: Props) {
    const [listOfPokemons, setListOfPokemons] = useState([{}]);
    useEmptyAuth();
    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/type/'+ name).then(a => setListOfPokemons(a.data.pokemon)).catch(() => errorNotification);
    }, []);
    return(
        <div className='main'>
        <Header/>
            <main className='h-max flex flex-wrap pl-20 pt-10'>
            {listOfPokemons.map(pokemon => <CardPokemon key={pokemon.pokemon?.name} pokemon={pokemon.pokemon} isLoaded={true} />)}
            </main>
            </div>
    )
}