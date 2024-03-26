import {Button} from "@mui/material";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import {Fighter} from "@/constants/pokemons";
import React from "react";
import {PreviewPokemon} from "@/components/PreviewPokemon";
import {useTranslate} from "@tolgee/react";

export const FightersPreview = ({yourPokemon, startFight, isFight, enemyPokemon}: {yourPokemon: Fighter, startFight: Function, isFight: boolean, enemyPokemon: Fighter}) => {
    const {t} = useTranslate();
    return <div className='flex justify-around'>
        <PreviewPokemon pokemon={yourPokemon}/>
        <div className='flex flex-col items-center justify-center'>
            {!isFight && <Button  variant="contained" endIcon={<SportsKabaddiIcon/>} onClick={() => startFight()}>{t("Arena.fightButton")}</Button>}
        </div>
        <PreviewPokemon pokemon={enemyPokemon}/>
    </div>
}
