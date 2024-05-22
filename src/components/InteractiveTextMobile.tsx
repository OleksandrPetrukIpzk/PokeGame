import {useTranslate} from "@tolgee/react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {NUMBER_ONE, NUMBER_ZERO} from "@/constants/pokemons";
import {INTRODUCTION_TEXT_ARR} from "@/constants/introduction";
import Button from "@mui/joy/Button";

export const InteractiveTextMobile = () => {
    const {t} = useTranslate()
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
    return  <div >
        <p>{t("Introduction."+INTRODUCTION_TEXT_ARR[currentTextCount])}</p>
        <Button variant={'solid'}  onClick={() => handleClickButton()}>{INTRODUCTION_TEXT_ARR[currentTextCount + NUMBER_ONE] ? t('Introduction.next') : t('Introduction.getPokemon')}</Button>
    </div>
}
