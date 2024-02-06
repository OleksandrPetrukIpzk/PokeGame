'use client'
import '../globals.css'
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useAppSelector} from "@/redux/store";
import {NUMBER_ZERO} from "@/constants/pokemons";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {ContainerSVG} from "@/app/introduction/SVGs";
import {isTheSame} from "@/functions/logic";
import {InteractiveText} from "@/app/introduction/InteractiveText";
export default function Introduction () {
    const arrPokemons = useAppSelector((state) => state.authReducer.value.arrPokemons);
    const router = useRouter()
    useEmptyAuth()
    useEffect(() => {
        if(!isTheSame(arrPokemons.length, NUMBER_ZERO)){
            router.push('/menu')
        }
    }, [arrPokemons]);
    return(<main className='dialig'>
        <div className='relative flex'>
            <div className='dialog-trainer'>
                <Image width={100} height={100} src='/pokemon-trainer.png' alt={'pokemon-trainer.png'}/>
            </div>
        <ContainerSVG/>
           <InteractiveText/>
        </div>
    </main>)
}
