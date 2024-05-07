import {Button} from "@mui/joy";
import SportsMmaOutlinedIcon from "@mui/icons-material/SportsMmaOutlined";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import {useTranslate} from "@tolgee/react";
import {useEffect, useState} from "react";
import {SPECIFIC_OF_ABILITIES} from "@/constants/pokemons";
import {isTheSame} from "@/functions/logic";
import {TypeForBackDrop} from "@/constants/types";

type ButtonsT = {
    gameStatus: string,
    sendResult: Function,
    handleLeave: Function,
    hitPokemon: Function,
    types: TypeForBackDrop[],
    specialHealth: Function,
    specialHit: Function
}

export const ButtonsForFight = ({gameStatus, sendResult, handleLeave, hitPokemon, types, specialHit, specialHealth}: ButtonsT) =>{
    const [isDash, setIsDash] = useState(false);
    const [isHeal, setIsHeal] = useState(false);
    const [countOfHealth, setCountOfHealth] = useState(5);
    const [countOfHit, setCountOfHit] = useState(5);
    const [isDisable, setIsDisable] = useState(false);
    const {t} = useTranslate();
    const leave = () =>{
        setIsDisable(true);
        setTimeout(()=>{
            setIsDisable(false);
        }, 2001)
     handleLeave();
    }
    const hit = () =>{
        hitPokemon();
        setIsDisable(true);
        setTimeout(()=>{
            setIsDisable(false);
        }, 4001)
        setCountOfHealth((prev: number) => {
            if(prev > 0){
              return prev - 1
            }
            return prev
        });
        setCountOfHit((prev: number) => {
            if(prev > 0){
                return prev - 1
            }
            return prev
        });
    }
    const send = async () => {
        sendResult()
    }
    const specialH = () =>{
        setIsDisable(true);
        setTimeout(()=>{
            setIsDisable(false);
        }, 2001)
        specialHealth();
        setCountOfHealth(5);
    }
    const specialA = () => {
        setIsDisable(true);
        setTimeout(()=>{
            setIsDisable(false);
        }, 2001)
        specialHit()
        setCountOfHit(5);
    }
    useEffect(() => {
        types.forEach((item) => {
            const ability = SPECIFIC_OF_ABILITIES[item.type.name];
            if(isTheSame(ability,'health')){
                setIsHeal(true)
            }
            if(isTheSame(ability,'damage')){
                setIsDash(true);
            }
        })
    }, [types]);
    return  (<div className={'flex gap-5'}>
        {!gameStatus && <Button disabled={isDisable} variant="solid" endDecorator={<SportsMmaOutlinedIcon/>} onClick={hit}>{t('Arena.hit')}</Button>}
        {!gameStatus && <Button disabled={isDisable} variant="solid" endDecorator={<DirectionsRunIcon/>} onClick={leave}>{t('Arena.leave')}</Button>}
        {!gameStatus && isDash && <Button disabled={isDisable} loading={countOfHit > 0} loadingIndicator={t('Arena.countHit', {countOfHit})} variant="solid" endDecorator={<SwipeRightIcon/>} onClick={specialA}>{t('Arena.UltraHit')}</Button>}
        {!gameStatus && isHeal && <Button disabled={isDisable} loading={countOfHealth > 0} loadingIndicator={t('Arena.countHealth', {countOfHealth})} variant="solid" endDecorator={<MonitorHeartIcon/>} onClick={specialH}>{t('Arena.heal')}</Button>}
        {gameStatus && <Button variant="solid" endDecorator={<AssignmentTurnedInIcon/>} onClick={send}>{t('Arena.finish')}</Button>}
    </div>)
}
