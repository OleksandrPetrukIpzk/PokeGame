import {IconPokemon} from "@/components/iconPokemon";
import LinearProgress from "@mui/joy/LinearProgress";
import {useEffect, useState} from "react";
import {ARR_OF_ICONS} from "@/constants/pokemons";

type HealthT = {
    sumaryHp: number,
    selectedPokemon: string
}

export const Health = ({sumaryHp, selectedPokemon}: HealthT) =>{
    const [startHealthPokemon, setStartHealthPokemon] = useState<number>(sumaryHp);
    const [activeSmile, setActiveSmile] = useState<string>('😈');
    const hpInPercent =  100 - (((startHealthPokemon - sumaryHp) / startHealthPokemon) * 100);

    useEffect(() => {
      const index = ARR_OF_ICONS.findIndex(emoji => emoji.value === activeSmile);
      if(hpInPercent <= 0){
          setActiveSmile("☠️");
      }
      else if(ARR_OF_ICONS[index + 1]?.hp >= hpInPercent){
          console.log(hpInPercent);
          console.log(ARR_OF_ICONS[index + 1]);
         setActiveSmile(ARR_OF_ICONS[index + 1].value);
      }
    }, [hpInPercent]);
    return(<div className='flex flex-col'>
        <p className='text-white text-lg'>❤️ {sumaryHp}</p>
        <IconPokemon id={selectedPokemon} size={100}/>
        <div className='flex gap-4 items-center'>
            <p className='text-4xl'>{activeSmile}</p>
        <LinearProgress determinate color="danger" variant={'soft'} value={hpInPercent} />
        </div>
    </div>)
}
