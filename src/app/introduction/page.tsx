'use client'
import '../globals.css'
import Image from "next/image";
import {useEffect, useState} from "react";
import {INTRODUCTION_TEXT_ARR} from "@/constants/introduction";
import {useRouter} from "next/navigation";
import {useAppSelector} from "@/redux/store";
import {getAuth} from "@/functions/auth";
import {useDispatch} from "react-redux";
import {NUMBER_ONE, NUMBER_ZERO} from "@/constants/pokemons";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
export default function Introduction () {
    const arrPokemons = useAppSelector((state) => state.authReducer.value.arrPokemons);
    const [currentTextCount, setCurrentTextCount] = useState(NUMBER_ZERO);
    const router = useRouter()
    const dispatch = useDispatch()

    const handleClickButton = () =>{
        if(INTRODUCTION_TEXT_ARR[currentTextCount + NUMBER_ONE]){
            setCurrentTextCount(prev => prev + NUMBER_ONE);
        }
        else{
            router.push('/introduction/getPokemon')
        }
    }
    useEmptyAuth()
    useEffect(() => {
        if(arrPokemons.length !== 0){
            router.push('/menu')
        }
    }, [arrPokemons]);
    return(<main className='dialig'>
        <div className='relative flex'>
            <div className='dialog-trainer'>
                <Image width={100} height={100} src='/pokemon-trainer.png' alt={'pokemon-trainer.png'}/>
            </div>
        <svg className='absolute svg-container' xmlns="http://www.w3.org/2000/svg" width="569" height="193" viewBox="0 0 569 193" fill="none">
            <path d="M79.1264 193H520.293C547.182 193 569 171.284 569 144.411V63.8811C569 37.0077 547.182 15.2013 520.293 15.2013H99.7679C96.9614 15.2013 94.0643 14.9299 91.2578 14.4775L10.593 0.181176C4.16516 -0.995101 -0.995239 5.42918 1.44916 11.4915L26.7079 73.9247C29.0617 79.7156 30.2386 85.959 30.2386 92.2023V144.501C30.4197 171.284 52.2382 193 79.1264 193Z" fill="white"/>
        </svg>
            <div className='relative z-10 dialog-block'>
                <p>{INTRODUCTION_TEXT_ARR[currentTextCount]}</p>
                <button onClick={() => handleClickButton()}>{INTRODUCTION_TEXT_ARR[currentTextCount + NUMBER_ONE] ? 'Next' : 'Get pokemon'}</button>
            </div>

        </div>
    </main>)
}