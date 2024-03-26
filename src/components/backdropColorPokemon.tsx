import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {COLOR_OF_ABILITIES, NUMBER_ONE, NUMBER_ZERO} from "@/constants/pokemons";
import {TypeForBackDrop} from "@/constants/types";
import {useTranslate} from "@tolgee/react";

type BackdropT = {
    types: TypeForBackDrop[],
    setBgColor: Dispatch<SetStateAction<string>>
}

export const BackdropColorPokemon = ({types, setBgColor}: BackdropT) =>{
    const {t} = useTranslate()
    const [currentIndex, setCurrentIndex] = useState(NUMBER_ZERO);
    const [isChange, setIsChange] = useState(true);
    useEffect(() =>{
        if(!COLOR_OF_ABILITIES[types[NUMBER_ONE]?.type?.name]) {
            setIsChange(false);
        }
        else{
            setIsChange(true);
        }
        setBgColor(COLOR_OF_ABILITIES[types[currentIndex].type?.name]);
    },[types, currentIndex, isChange]);
    const changeBg = () =>{
        if(COLOR_OF_ABILITIES[types[currentIndex+ NUMBER_ONE]?.type?.name]){
            setCurrentIndex(prev => prev + NUMBER_ONE);
        }
        else{
            setCurrentIndex(NUMBER_ZERO);
        }
    }
    return(<>
        {isChange && <button className='m-auto  flex bg-white p-3 hoverBG rounded-full' onClick={() => changeBg()}>{t('Pokemon.BG')}</button>}
    </>)
}
