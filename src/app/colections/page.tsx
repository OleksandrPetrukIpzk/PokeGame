'use client'
import {Header} from "@/Header/Header";
import {useAppSelector} from "@/redux/store";
import {CardPokemon} from "@/app/cardPokemon";
import '../globals.css'
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
export default function Colections () {
    const arrPokemons = useAppSelector((state) => state.authReducer.value.arrPokemons);
    const selectedPokemon = useAppSelector((state) => state.authReducer.value.selectedPokemon);
    useEmptyAuth()
    return(<>
        <main className='main'>
            <Header/>
        <div className='items-center justify-center content-center flex '>
            <CardPokemon pokemon={{name: selectedPokemon, url:'https://pokeapi.co/api/v2/pokemon/' + selectedPokemon}} isLoaded={true}/>
        </div>
            <p className='text-center'>You collection count {arrPokemons.length} Pokemons</p>
            <div className='flex flex-wrap'>
                {arrPokemons && arrPokemons.map(pokemonId => <CardPokemon key={pokemonId} pokemon={{name: selectedPokemon, url:'https://pokeapi.co/api/v2/pokemon/' + pokemonId}} isLoaded={true}/>)}
            </div>
        </main>
    </>)
}
