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
import {checkTypes} from "@/functions/figts";
import {Ability, FighterT} from "@/constants/types";
import {useWindowSize} from "@/hooks/useWindowSize";
import {PotionPanel} from "@/components/PotionPanel";
export default function AfkArena () {
    const {t} = useTranslate();
    const [isFight, setIsFight] = useState<boolean>(false);
    const [gameStatus, setGameStatus] = useState<string>(EMPTY_STRING);
    const [yourPokemon, setYourPokemon] = useState<FighterT>(DEFAULT_TEMPLATE_FOR_FIGHT);
    const [enemyPokemon, setEnemyPokemon] = useState<FighterT>(DEFAULT_TEMPLATE_FOR_FIGHT);
    const {isMobile} = useWindowSize();
    const {id,coins, stageInOfflineArena,selectedPokemon  } = useAppSelector((state) => state.authReducer.value);
    const {click, countOfRichCoins, countOfStage, ids} = useAppSelector((state) => state.achiveReducer.value)
    const dispatch = useDispatch();

    const hitPokemon = () =>{
        if(isHit(yourPokemon, enemyPokemon)){
            const element = document.querySelector('#pokemon__left');
            const elementEnemy = document.querySelector('#pokemon__right');
            element.classList.add('pokemon__animation__right');
            setTimeout(()=>{
                element.classList.remove('pokemon__animation__right');
                elementEnemy.classList.add('pokemon__animation__left');
                setTimeout( () =>{
                    elementEnemy.classList.remove('pokemon__animation__left');
                }, 2000)
            }, 2000)
            hit(setYourPokemon, setEnemyPokemon, yourPokemon.sumaryAttack, enemyPokemon.sumaryAttack)
            addAchives(id, 'click', click, dispatch, ids, t('Notification.hit'), addClick, t)
        } else if(isYouLose(yourPokemon, enemyPokemon)){
            const elementEnemy = document.querySelector('#pokemon__right');
            elementEnemy.classList.add('pokemon__animation__left');
            setTimeout(()=>{
                elementEnemy.classList.remove('pokemon__animation__left');
            }, 2000)
            setGameStatus(LOSE)
            youLose(setYourPokemon, setEnemyPokemon, yourPokemon.sumaryAttack);
        } else if(isYouWin(yourPokemon, enemyPokemon)){
            const element = document.querySelector('#pokemon__left');
            element.classList.add('pokemon__animation__right');
            setTimeout(()=>{
                element.classList.remove('pokemon__animation__right');
            }, 2000)
            setGameStatus(WIN);
            youWin(setYourPokemon, setEnemyPokemon, enemyPokemon.sumaryAttack);
            addAchives(id, 'countOfStage', countOfStage, dispatch, ids, t('Notification.stage'), addCountOfStage, t);
            addAchives(id, 'countOfRichCoins', countOfRichCoins, dispatch, ids, t('Notification.winCoins'), addCountOfRichCoins, t);
        }
    }
    const handleLeave = () =>{
        if(isBiggest(yourPokemon.speed, enemyPokemon.speed)){
            const element = document.querySelector('#pokemon__left');
            element.classList.add('pokemon__animation__leave__right');
            setTimeout(() =>{
                setIsFight(false);
                element.classList.remove('pokemon__animation__leave__right');
            }, 2000)
        }
        else{
            youCantLeave();
            const element = document.querySelector('#pokemon__left');
            element.classList.add('pokemon__animation__cantLeave__right');
            setTimeout(()=>{
                element.classList.remove('pokemon__animation__cantLeave__right');
            }, 2000)
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
        const element = document.querySelector('#pokemon__left');
        element.classList.add('pokemon__animation__right');
        setTimeout(()=>{
            element.classList.remove('pokemon__animation__right');
        }, 2000)
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
        const element = document.querySelector('.health__true');
        element.classList.add('health__animation__true');
        setTimeout(() => {
            element.classList.remove('health__animation__true');
        }, 2000)
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
    const handleChoicePotion = (idPotion: number) =>{
        switch(idPotion){
            case 1:{
                // todo: add animation
                setYourPokemon(prev => {
                    return {
                        ...prev,
                        speed: prev.sumaryAttack + 100000
                    }
                });
                break;
            }
            case 2: {
                setYourPokemon(prev =>{
                    return {
                        ...prev,
                        sumaryHp: prev.sumaryHp * 2,
                    }
                });
                break;
            }
            case 3: {
                setYourPokemon(prev =>{
                    return {
                        ...prev,
                        sumaryAttack: prev.sumaryAttack * 2,
                    }
                })
                break;
            }
            case 4:{
                break;
            }
            case 5: {
                const element = document.querySelector('#pokemon__left');
                element.classList.add('pokemon__animation__right');
                setTimeout(()=>{
                    element.classList.remove('pokemon__animation__right');
                }, 2000)
                setGameStatus(WIN);
                youWin(setYourPokemon, setEnemyPokemon, 0);
                addAchives(id, 'countOfRichCoins', countOfRichCoins, dispatch, ids, t("Notification.winCoins"), addCountOfRichCoins, t);
                break;
            }
            case 6: {
                break;
            }
            case 7: {
                // todo: add animation
                setYourPokemon(prev => {
                    return {
                        ...prev,
                        sumaryAttack: prev.sumaryAttack + enemyPokemon.sumaryAttack
                    }
                });
                setEnemyPokemon(prev => {
                    return {
                        ...prev,
                        sumaryAttack: prev.sumaryAttack / 2
                    }
                });
                break;
            }
        }

    }
    useEmptyAuth([stageInOfflineArena]);
    useEffect(() => {
       configurePokemons(setEnemyPokemon, setYourPokemon, selectedPokemon, stageInOfflineArena);
    },[stageInOfflineArena]);

    return(<main className='main'>
            <Header/>
            <p className='text-center text-2xl'>{t('Arena.Stage')} {stageInOfflineArena}</p>
            {isFight && <Box sx={{...STYLES_FOR_MODAL, width: isMobile ? 300 : 800}} className='box__fight'>
              <GameStatus gameStatus={gameStatus}/>
            <Fighters yourPokemon={yourPokemon} enemyPokemon={enemyPokemon} />
                <ButtonsForFight gameStatus={gameStatus} sendResult={sendResult} handleLeave={handleLeave} hitPokemon={hitPokemon} types={yourPokemon.types} specialHealth={specialHealth} specialHit={specialHit}/>
                <PotionPanel handleChange={handleChoicePotion}/>
            </Box>}
            <FightersPreview yourPokemon={yourPokemon} startFight={startFight} isFight={isFight} enemyPokemon={enemyPokemon}/>
        </main>)
}
