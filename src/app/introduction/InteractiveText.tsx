import {INTRODUCTION_TEXT_ARR} from "@/constants/introduction";
import {NUMBER_ONE, NUMBER_ZERO} from "@/constants/pokemons";
import {useState} from "react";
import {useRouter} from "next/navigation";

export const InteractiveText = () =>{
    const router = useRouter()
    const [currentTextCount, setCurrentTextCount] = useState(NUMBER_ZERO);
    const handleClickButton = () =>{
        if(INTRODUCTION_TEXT_ARR[currentTextCount + NUMBER_ONE]){
            setCurrentTextCount(prev => prev + NUMBER_ONE);
        }
        else{
            router.push('/introduction/getPokemon')
        }
    }
    return  <div className='relative z-10 dialog-block'>
        <p>{INTRODUCTION_TEXT_ARR[currentTextCount]}</p>
        <button onClick={() => handleClickButton()}>{INTRODUCTION_TEXT_ARR[currentTextCount + NUMBER_ONE] ? 'Next' : 'Get pokemon'}</button>
    </div>
}
