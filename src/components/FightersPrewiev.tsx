import {Button} from "@mui/material";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import {Fighter} from "@/constants/pokemons";
import React from "react";
import {PreviewPokemon} from "@/components/PreviewPokemon";
import {useTranslate} from "@tolgee/react";
import {FighterT} from "@/constants/types";

type FightersPrewievT = {
    yourPokemon: FighterT,
    startFight: Function,
    isFight: boolean,
    enemyPokemon: FighterT
}

export const FightersPreview = ({yourPokemon, startFight, isFight, enemyPokemon}: FightersPrewievT) => {
    const {t} = useTranslate();
    return <div className='flex justify-around'>
        <PreviewPokemon pokemon={yourPokemon}/>
        <div className='flex flex-col items-center justify-center'>
            {!isFight && <Button  variant="contained" endIcon={<SportsKabaddiIcon/>} onClick={() => startFight()}>{t("Arena.fightButton")}</Button>}
        </div>
        <PreviewPokemon pokemon={enemyPokemon}/>
    </div>
}
