import {Button} from "@mui/material";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import {Fighter} from "@/constants/pokemons";
import React, {Dispatch, SetStateAction} from "react";
import {PreviewPokemon} from "@/app/storyMode/PreviewPokemon";

export const FightersPreview = ({yourPokemon, setIsFight, isFight, enemyPokemon}: {yourPokemon: Fighter, setIsFight: Dispatch<SetStateAction<boolean>>, isFight: boolean, enemyPokemon: Fighter}) => {
    return <div className='flex justify-around'>
        <PreviewPokemon pokemon={yourPokemon}/>
        <div className='flex flex-col items-center justify-center'>
            {!isFight && <Button  variant="contained" endIcon={<SportsKabaddiIcon/>} onClick={() => setIsFight(true)}>Fight</Button>}
        </div>
        <PreviewPokemon pokemon={enemyPokemon}/>
    </div>
}
