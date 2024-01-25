'use client'
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@/redux/store";
import {
    DEFAULT_TEMPLATE_FOR_FIGHT,
    EMPTY_STRING, LOSE, NUMBER_ONE,
    STYLES_FOR_MODAL, WIN
} from "@/constants/pokemons";
import {Header} from "@/Header/Header";

import {Box} from "@mui/material";
import UserServices from "@/services/userServices";
import {changeStage} from "@/redux/features/auth-slice";
import {
    checkCurrentImage,
    configurePokemons,
    hit,
    isBiggest,
    isHit,
    isYouLose,
    isYouWin, youCantLeave,
    youLose,
    youWin
} from "@/functions/pocemons";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {GameStatus} from "@/app/storyMode/GameStatus";
import {Fighters} from "@/app/storyMode/Fighters";
import {ButtonsForFight} from "@/app/storyMode/ButtonsForFight";
import {isTheSame} from "@/functions/logic";
import {FightersPreview} from "@/app/storyMode/FightersPrewiev";
import '../globals.css'
export default function AfkArena () {
    const [isFight, setIsFight] = useState(false);
    const [gameStatus, setGameStatus] = useState(EMPTY_STRING);
    const [yourPokemon, setYourPokemon] = useState(DEFAULT_TEMPLATE_FOR_FIGHT);
    const [enemyPokemon, setEnemyPokemon] = useState(DEFAULT_TEMPLATE_FOR_FIGHT);
    const email = useAppSelector((state) => state.authReducer.value.email);
    const coins = useAppSelector((state) => state.authReducer.value.coins);
    const stageInOfflineArena = useAppSelector((state) => state.authReducer.value.stageInOfflineArena);
    const selectedPokemon = useAppSelector((state) => state.authReducer.value.selectedPokemon);
    const dispatch = useDispatch();

    const hitPokemon = () =>{
        if(isHit(yourPokemon, enemyPokemon)){
            hit(setYourPokemon, setEnemyPokemon, yourPokemon.sumaryAttack, enemyPokemon.sumaryAttack)
        } else if(isYouLose(yourPokemon, enemyPokemon)){
            setGameStatus(LOSE)
            youLose(setYourPokemon, setEnemyPokemon, yourPokemon.sumaryAttack);
        } else if(isYouWin(yourPokemon, enemyPokemon)){
            setGameStatus(WIN)
            youWin(setYourPokemon, setEnemyPokemon, enemyPokemon.sumaryAttack)
        }
    }
    const handleLeave = () =>{
        if(isBiggest(yourPokemon.speed, enemyPokemon.speed)){
            setIsFight(false);
        }
        else{
            youCantLeave()
        }
    }

    const sendResult = async () =>{
        if(isTheSame(gameStatus, WIN)){
            const response = await UserServices.addCoins(email, coins + NUMBER_ONE);
            await UserServices.nextStage(stageInOfflineArena + NUMBER_ONE);
            dispatch(changeStage(stageInOfflineArena + NUMBER_ONE));
        }
        setIsFight(false);
        setGameStatus(EMPTY_STRING);
    }

    useEmptyAuth([stageInOfflineArena])
    useEffect(() => {
       configurePokemons(setEnemyPokemon, setYourPokemon, selectedPokemon, stageInOfflineArena)
    },[stageInOfflineArena, isFight])

    return(<>
        <main className='main'>
            <Header/>
            {isFight && <Box sx={{...STYLES_FOR_MODAL, width: 800}}>
              <GameStatus gameStatus={gameStatus}/>
            <Fighters yourPokemon={yourPokemon} enemyPokemon={enemyPokemon} />
                <ButtonsForFight gameStatus={gameStatus} sendResult={sendResult} handleLeave={handleLeave} hitPokemon={hitPokemon}/>
            </Box>}
            <FightersPreview yourPokemon={yourPokemon} setIsFight={setIsFight} isFight={isFight} enemyPokemon={enemyPokemon}/>
        </main>
    </>)
}
