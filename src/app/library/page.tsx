"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {CardPokemon} from "@/app/cardPokemon";
import '../globals.css'
import {Header} from "@/Header/Header";
import {errorNotification} from "@/functions/pocemons";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {EMPTY_STRING} from "@/constants/pokemons";

type GetAxios = {
        data:{
            next: string,
            previous: string,
            results: []
}

}
export default function Home() {
  const [baseUrl, setBaseUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [nextUrl, setNextUrl] = useState(EMPTY_STRING);
  const [previousUrl, setPreviousUrl] = useState(EMPTY_STRING);
  const [pokemons, setPokemons] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEmptyAuth();
  useEffect(() =>{
  axios.get(baseUrl).then((info: GetAxios):void => {
    setNextUrl(info.data.next);
    if(info.data.previous){
      setPreviousUrl(info.data.previous);
    }
    setPokemons(info.data.results);
    setIsLoaded(true);
  }).catch(() => errorNotification);
  },[baseUrl]);
  return (
      <div className='main'>
          <Header/>
    <main className='h-max flex flex-wrap pl-20 pt-10'>
      {isLoaded ? pokemons.map((pokemon:object):JSX.Element => <CardPokemon key={pokemon.name} pokemon={pokemon} isLoaded={isLoaded}></CardPokemon>) : <p>Loading...</p>}
        <button className='flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200' onClick={() => {setBaseUrl(previousUrl);
            setIsLoaded(false);
        }}>Prev</button>
        <button className='flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200' onClick={() => {
            setBaseUrl(nextUrl);
            setIsLoaded(false);
        }
        }>Next</button>
    </main>
      </div>
  )
}
