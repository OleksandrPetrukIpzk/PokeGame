'use client'
import {useEffect, useState} from "react";
import Image from "next/image";
import {CardPokemon} from "@/app/cardPokemon";
import { NUMBER_ONE, NUMBER_ZERO} from "@/constants/pokemons";
import '../../globals.css'
import {useAppSelector} from "@/redux/store";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {randomPokemonNumber} from "@/functions/pocemons";
import {isTheSame} from "@/functions/logic";
import UserServices from "@/services/userServices";
import {IconPokemon} from "@/IconPokemon/iconPokemon";
export default function GetPokemon () {
    const [isClicked, setIsClicked] = useState(false);
    const [numberPokemon, setNumberPokemon] = useState(NUMBER_ONE);
    const arrPokemons = useAppSelector((state) => state.authReducer.value.arrPokemons);
    const id = useAppSelector((state) => state.authReducer.value.id);
    const router = useRouter()
    const handleClickButton = async () =>{
        const numberPokemon = randomPokemonNumber();
        setNumberPokemon(numberPokemon);
        await UserServices.addPokemon(id, numberPokemon.toString())
        await UserServices.changeCurrentPokemonById(id, numberPokemon.toString())
        await UserServices.changeCountOfMoney(id, 20)
        setIsClicked(true);
    }
    useEmptyAuth()
    useEffect(() => {
        if(!isTheSame(arrPokemons.length, NUMBER_ZERO)){
            router.push('/menu')
        }
    }, []);
    return(
        <>
            <main className='get-pokemon flex justify-center flex-col align-middle items-center'>
                <div className='get-pokemon-icon'>
                {isClicked ? <IconPokemon id={numberPokemon.toString()} size={200}/> : <Image width={150} height={150} src='/Daco_659762.png' alt='Daco_659762.png'/>}
                </div>
                <p>{isClicked ? 'Here your first Pokemon' : 'Get your first Pokemon'}</p>
                {!isClicked ? <button className='get-pokemon-button' onClick={() => handleClickButton()}>Get Lucky</button> : <Link href='/menu'><button  className='get-pokemon-button'>Go to adventure</button></Link>}
            </main>
        </>
    )
}
