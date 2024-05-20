'use client'
import {useEffect, useState} from "react";
import Image from "next/image";
import {EMPTY_STRING, NUMBER_ONE, NUMBER_ZERO} from "@/constants/pokemons";
import '../../globals.css'
import {useAppSelector} from "@/redux/store";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {isTheSame} from "@/functions/logic";
import {IconPokemon} from "@/components/iconPokemon";
import {useTranslate} from "@tolgee/react";
import {getFirstPokemon} from "@/functions/asyncFynctions";

export default function GetPokemon () {
    const {t} = useTranslate();
    const [isClicked, setIsClicked] = useState(false);
    const [numberPokemon, setNumberPokemon] = useState(NUMBER_ONE);
    const arrPokemons = useAppSelector((state) => state.authReducer.value.arrPokemons);
    const selectedPokemon = useAppSelector((state) => state.authReducer.value.selectedPokemon);
    const id = useAppSelector((state) => state.authReducer.value.id);
    const router = useRouter()

    useEmptyAuth();
    useEffect(() => {

        if(!isTheSame(arrPokemons.length, NUMBER_ZERO) || !isTheSame(selectedPokemon, EMPTY_STRING)){
            router.push('/menu');
        }
    }, []);
    return(<main className='get-pokemon flex justify-center flex-col align-middle items-center'>
                <div className='get-pokemon-icon'>
                {isClicked ?
                    <IconPokemon id={numberPokemon.toString()} size={200}/>
                    :
                    <Image width={150} height={150} src='/Daco_659762.png' alt='Egg pocemons'/>}
                </div>
                <p>{isClicked ? t('Introduction.first') : t('Introduction.get')}</p>
                {!isClicked ?
                    <button className='get-pokemon-button' onClick={() => getFirstPokemon(setNumberPokemon, id, setIsClicked)}>{t('Introduction.lucky')}</button>
                    :
                    <Link href='/menu'>
                        <button  className='get-pokemon-button'>{t('Introduction.goTo')}</button>
                    </Link>}
            </main>)
}
