"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {CardPokemon} from "@/components/cardPokemon";
import '../globals.css'
import {Header} from "@/components/Header";
import {errorNotification} from "@/functions/pocemons";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {EMPTY_STRING} from "@/constants/pokemons";
import Button from "@mui/joy/Button";
import {ControlButtons} from "@/components/ControlButtons";
import {useTranslate} from "@tolgee/react";

type GetAxios = {
        data:{
            next: string,
            previous: string,
            results: []
}

}
export default function Home() {
  const {t} = useTranslate();
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
          <main className='h-max pl-20 pt-10'>
              <ControlButtons previousUrl={previousUrl} setBaseUrl={setBaseUrl} setIsLoaded={setIsLoaded} nextUrl={nextUrl}/>
              <div className='flex flex-wrap justify-center'>
              {isLoaded ? pokemons.map((pokemon: object): JSX.Element =>
                      <CardPokemon key={pokemon.name} pokemon={pokemon} isLoaded={isLoaded}/>) :
                  <p>{t('Library.loading')}</p>}
              </div>
              <ControlButtons previousUrl={previousUrl} setBaseUrl={setBaseUrl} setIsLoaded={setIsLoaded} nextUrl={nextUrl}/>
          </main>
      </div>
  )
}
