'use client'
import {Header} from "@/components/Header";
import {useAppSelector} from "@/redux/store";
import {CardPokemon} from "@/components/cardPokemon";
import '../globals.css'
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {IconPokemon} from "@/components/iconPokemon";
import {useTranslate} from "@tolgee/react";
export default function Colections () {
    const {t} = useTranslate();
    const arrPokemons = useAppSelector((state) => state.authReducer.value.arrPokemons);
    const selectedPokemon = useAppSelector((state) => state.authReducer.value.selectedPokemon);
    useEmptyAuth()
    return(<>
        <main className='main'>
            <Header/>
        <div className='items-center content-center flex flex-col'>
            <p className='pt-4 text-2xl font-bold'>{t('Collection.your')}</p>
            <IconPokemon id={selectedPokemon} size={300}/>
        </div>
            <p className='text-center mt-5'>{t('Collection.count')} {arrPokemons.length}</p>
            <div className='flex flex-wrap ml-20 mr-20 justify-center'>
                {arrPokemons && arrPokemons.map(pokemonId => <CardPokemon key={pokemonId} pokemon={{name: selectedPokemon, url:'https://pokeapi.co/api/v2/pokemon/' + pokemonId}} isLoaded={true}/>)}
            </div>
        </main>
    </>)
}
