'use client'
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@/redux/store";
import {
    DEFAULT_TEMPLATE_FOR_FIGHT,
    EMPTY_STRING, LOSE, NUMBER_ONE,
    STYLES_FOR_MODAL, WIN
} from "@/constants/pokemons";
import {Header} from "@/components/Header";

import {Box} from "@mui/material";
import UserServices from "@/services/userServices";
import {changeStage} from "@/redux/features/auth-slice";
import {
    configurePokemons,
    hit,
    isBiggest,
    isHit,
    isYouLose,
    isYouWin, scaleDMG, youCantLeave,
    youLose,
    youWin
} from "@/functions/pocemons";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {GameStatus} from "@/components/GameStatus";
import {Fighters} from "@/components/Fighters";
import {ButtonsForFight} from "@/components/ButtonsForFight";
import {isTheSame} from "@/functions/logic";
import {FightersPreview} from "@/components/FightersPrewiev";
import '../globals.css'
import {addAchives} from "@/functions/achives";
import {addClick, addCountOfRichCoins, addCountOfStage} from "@/redux/features/achievements";
import {useTranslate} from "@tolgee/react";
import {checkTypes, sendWinner} from "@/functions/figts";
import {Ability, FighterT} from "@/constants/types";
export default function AfkArena () {
    const {t} = useTranslate();
    const [isFight, setIsFight] = useState<boolean>(false);
    const [gameStatus, setGameStatus] = useState<string>(EMPTY_STRING);
    const [yourPokemon, setYourPokemon] = useState<FighterT>(DEFAULT_TEMPLATE_FOR_FIGHT);
    const [enemyPokemon, setEnemyPokemon] = useState<FighterT>(DEFAULT_TEMPLATE_FOR_FIGHT);
    const {id,coins, stageInOfflineArena,selectedPokemon  } = useAppSelector((state) => state.authReducer.value);
    const {click, countOfRichCoins, countOfStage, ids} = useAppSelector((state) => state.achiveReducer.value)
    const dispatch = useDispatch();

    const hitPokemon = () =>{
        if(isHit(yourPokemon, enemyPokemon)){
            hit(setYourPokemon, setEnemyPokemon, yourPokemon.sumaryAttack, enemyPokemon.sumaryAttack)
            addAchives(id, 'click', click, dispatch, ids, t('Notification.hit'), addClick, t)
        } else if(isYouLose(yourPokemon, enemyPokemon)){
            setGameStatus(LOSE)
            youLose(setYourPokemon, setEnemyPokemon, yourPokemon.sumaryAttack);
        } else if(isYouWin(yourPokemon, enemyPokemon)){
            setGameStatus(WIN);
            youWin(setYourPokemon, setEnemyPokemon, enemyPokemon.sumaryAttack);
            addAchives(id, 'countOfStage', countOfStage, dispatch, ids, t('Notification.stage'), addCountOfStage, t);
            addAchives(id, 'countOfRichCoins', countOfRichCoins, dispatch, ids, t('Notification.winCoins'), addCountOfRichCoins, t);
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
            const response = await UserServices.changeCountOfMoney(id, coins + NUMBER_ONE);
            await UserServices.changeStage(id, stageInOfflineArena + NUMBER_ONE);
            dispatch(changeStage(stageInOfflineArena + NUMBER_ONE));
        }
        setIsFight(false);
        setGameStatus(EMPTY_STRING);
    }
    const startFight = () => {
        setIsFight(true);
        scaleDMG(enemyPokemon, yourPokemon, setYourPokemon, setEnemyPokemon);
    }
    const specialHit = () => {
        let startDmgCurrentUser = 1;
        yourPokemon.types?.forEach((item: Ability) => {
            enemyPokemon.types.forEach((type: Ability) => {
                startDmgCurrentUser *= checkTypes(type.type.name, item.type.name);
            })
        })
        hit(setYourPokemon, setEnemyPokemon, yourPokemon.specialAttack * 100 * startDmgCurrentUser, 0);
        if (enemyPokemon.sumaryHp - yourPokemon.specialAttack * 100 * startDmgCurrentUser <= 0) {
            setGameStatus(WIN);
            youWin(setYourPokemon, setEnemyPokemon, enemyPokemon.sumaryAttack);
            addAchives(id, 'countOfStage', countOfStage, dispatch, ids, t('Notification.stage'), addCountOfStage, t);
            addAchives(id, 'countOfRichCoins', countOfRichCoins, dispatch, ids, t('Notification.winCoins'), addCountOfRichCoins, t);
        }
    }
    const specialHealth = () => {
        let startDmgCurrentUser = 1;
        yourPokemon.types?.forEach((item: Ability) => {
            enemyPokemon.types.forEach((type: Ability) => {
                startDmgCurrentUser *= checkTypes(type.type.name, item.type.name);
            })
        })
        setYourPokemon((prev: FighterT) =>{
            return{
                ...prev,
                sumaryHp: prev.sumaryHp + (prev.specialDefence * 100 * startDmgCurrentUser)
            }
        })
    }
    useEmptyAuth([stageInOfflineArena]);
    useEffect(() => {
       configurePokemons(setEnemyPokemon, setYourPokemon, selectedPokemon, stageInOfflineArena);
    },[stageInOfflineArena, gameStatus]);

    return(<main className='main'>
            <Header/>
            <p className='text-center text-2xl'>{t('Arena.Stage')} {stageInOfflineArena}</p>
            {isFight && <Box sx={{...STYLES_FOR_MODAL, width: 800}} className='box__fight'>
              <GameStatus gameStatus={gameStatus}/>
            <Fighters yourPokemon={yourPokemon} enemyPokemon={enemyPokemon} />
                <ButtonsForFight gameStatus={gameStatus} sendResult={sendResult} handleLeave={handleLeave} hitPokemon={hitPokemon} types={yourPokemon.types} specialHealth={specialHealth} specialHit={specialHit}/>
            </Box>}
            <FightersPreview yourPokemon={yourPokemon} startFight={startFight} isFight={isFight} enemyPokemon={enemyPokemon}/>
        </main>)
}
