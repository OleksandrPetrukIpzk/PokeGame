import Image from "next/image";
import {Button} from "@mui/material";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import {Fighter} from "@/constants/pokemons";
import {Dispatch, SetStateAction} from "react";

export const FightersPreview = ({yourPokemon, setIsFight, isFight, enemyPokemon}: {yourPokemon: Fighter, setIsFight: Dispatch<SetStateAction<boolean>>, isFight: boolean, enemyPokemon: Fighter}) => {
    return <div className='flex justify-between'>
        <div className='text-center'>
            <p>{yourPokemon.name}</p>
            <Image src={yourPokemon.img} alt={yourPokemon.img} width={200} height={200}/>
        </div>
        <div className='flex flex-col items-center justify-center'>
            <p>VS</p>
            {!isFight && <Button endIcon={<SportsKabaddiIcon/>} onClick={() => setIsFight(true)}>Fight</Button>}
        </div>
        <div className='text-center'>
            <p>{enemyPokemon.name}</p>
            <Image src={enemyPokemon.img} alt={enemyPokemon.img} width={200} height={200}/>
        </div>
    </div>
}
