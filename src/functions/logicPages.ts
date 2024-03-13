import {isTheSame} from "@/functions/logic";
import {WIN} from "@/constants/pokemons";
import {useTranslate} from "@tolgee/react";

export const ifYouWin = (gameStatus: string, t: any) =>{
    return isTheSame(gameStatus, WIN)  ? t('Arena.win') : t('Arena.lose')
}

export const ifTheFight = (gameStatus: string) =>{
    const {t} = useTranslate()
    return !gameStatus && t('Arena.fightPanel')
}
