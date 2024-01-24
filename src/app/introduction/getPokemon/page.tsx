'use client'

import {useEffect, useState} from "react";
import Image from "next/image";
import {CardPokemon} from "@/app/cardPokemon";
import {DEFAULT_LINK} from "@/constants/pokemons";
import '../../globals.css'
import {useAppSelector} from "@/redux/store";
import {useRouter} from "next/navigation";
import AuthServices from "@/services/authServices";
import Link from "next/link";
import {getAuth} from "@/functions/auth";
import {useDispatch} from "react-redux";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {randomPokemonNumber} from "@/functions/pocemons";
export default function GetPokemon () {
    const [isClicked, setIsClicked] = useState(false);
    const [numberPokemon, setNumberPokemon] = useState(1);
    const arrPokemons = useAppSelector((state) => state.authReducer.value.arrPokemons);
    const router = useRouter()
    const dispatch = useDispatch()
    const handleClickButton = async () =>{
        const numberPokemon = randomPokemonNumber();
        setNumberPokemon(numberPokemon);
        await AuthServices.addPokemon(numberPokemon.toString(), 20)
        setIsClicked(true);
    }
    useEmptyAuth()
    useEffect(() => {
        if(arrPokemons.length !== 0){
            router.push('/menu')
        }
    }, []);
    return(
        <>
            <main className='get-pokemon flex justify-center flex-col align-middle items-center'>
                <div className='get-pokemon-icon'>
                {isClicked ? <CardPokemon pokemon={{url:'https://pokeapi.co/api/v2/pokemon/' + numberPokemon, name: numberPokemon}} isLoaded={true} /> : <Image width={100} height={100} src='/Daco_659762.png' alt='Daco_659762.png'/>}
                </div>
                <p>{isClicked ? 'Here your first Pokemon' : 'Get your first Pokemon'}</p>
                {!isClicked ? <button className='get-pokemon-button' onClick={() => handleClickButton()}>Get Lucky</button> : <Link href='/menu'><button  className='get-pokemon-button'>Go to adventure</button></Link>}
            </main>
        </>
    )
}