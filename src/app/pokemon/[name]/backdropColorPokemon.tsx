import {useEffect, useState} from "react";
import {COLOR_OF_ABILITIES, EMPTY_STRING, NUMBER_ONE, NUMBER_ZERO} from "@/constants/pokemons";
type Type = {
    type:{
        name: string,
        url:string
    }
}
type Types = {
    types: Type[],
}

export const BackdropColorPokemon = ({types}:Types) =>{
    const [selectedColor, setSelectedColor] = useState(EMPTY_STRING);
    const [currentIndex, setCurrentIndex] = useState(NUMBER_ZERO);
    const [isChange, setIsChange] = useState(true);
    const firstIndex = NUMBER_ONE;
    useEffect(() =>{
        if(!COLOR_OF_ABILITIES[types[firstIndex]?.type?.name]) {
            setIsChange(false);
        }
        else{
            setIsChange(true);
        }
        setSelectedColor(COLOR_OF_ABILITIES[types[currentIndex].type?.name]);
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
        {isChange && <button className='m-auto  flex bg-white p-3 hoverBG rounded-full' onClick={() => changeBg()}>Change BG</button>}
        <div style={{backgroundColor: selectedColor}} className='backdrop-pokemon'>
        </div>
    </>)
}