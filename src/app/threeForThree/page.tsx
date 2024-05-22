'use client'
import {Header} from "@/components/Header";
import React, {useState} from "react";
import {ModalListPokemons} from "@/components/ModalListPokemons";
import {SelectPokemon} from "@/components/SelectPokemon";
import {EMPTY_STRING, LOSE, NUMBER_ONE, NUMBER_ZERO, STYLES_FOR_MODAL, WIN} from "@/constants/pokemons";
import {Ability, FighterT} from "@/constants/types";
import '../globals.css'
import {ThreeForThreeEnemyPokemon} from "@/components/ThreeForThreeEnemyPokemon";
import {Box, Button} from "@mui/material";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import {useTranslate} from "@tolgee/react";
import {Fighters} from "@/components/Fighters";
import {ButtonsForFight} from "@/components/ButtonsForFight";
import {
    hitThree, isBiggest,
    isHit,
    isYouLose,
    isYouWin, youCantLeave,
    youLoseThree,
    youWinThree
} from "@/functions/pocemons";
import {addAchives} from "@/functions/achives";
import {addClick, addCountOfRichCoins, addCountOfStage} from "@/redux/features/achievements";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@/redux/store";
import {checkTypes} from "@/functions/figts";
import UserServices from "@/services/userServices";
import {useWindowSize} from "@/hooks/useWindowSize";

export default function ThreeForThreePage ()  {
    const {t} = useTranslate();
    const [isModalPokemonOpen, setIsModalPokemonOpen] = useState<boolean>(false);
    const [activeId, setActiveId] = useState<number>(NUMBER_ZERO);
    const [activeEnemyId, setActiveEnemyId] = useState<number>(NUMBER_ZERO);
    const [gameStatus, setGameStatus] = useState<string>("");
    const {isMobile} = useWindowSize();
    const [selectedPokemons, setSelectedPokemons] = useState<FighterT[]>([{
        name: '',
        sumaryAttack: 0,
        speed: 0,
        specialAttack: 0,
        sumaryHp: 0,
        specialDefence: 0,
        types: [{type: {
            name: ''
            }}],
    }, {     name: '',
        sumaryAttack: 0,
        speed: 0,
        specialAttack: 0,
        sumaryHp: 0,
        specialDefence: 0,
        types: [{type: {
                name: ''
            }}],}, {     name: '',
        sumaryAttack: 0,
        speed: 0,
        specialAttack: 0,
        sumaryHp: 0,
        specialDefence: 0,
        types: [{type: {
                name: ''
            }}],}]);
    const [enemyPokemons, setEnemyPokemons] = useState<FighterT[]>([{
        name: '',
        sumaryAttack: 0,
        speed: 0,
        specialAttack: 0,
        sumaryHp: 0,
        specialDefence: 0,
        types: [{type: {
                name: ''
            }}],
    }, {     name: '',
        sumaryAttack: 0,
        speed: 0,
        specialAttack: 0,
        sumaryHp: 0,
        specialDefence: 0,
        types: [{type: {
                name: ''
            }}],}, {     name: '',
        sumaryAttack: 0,
        speed: 0,
        specialAttack: 0,
        sumaryHp: 0,
        specialDefence: 0,
        types: [{type: {
                name: ''
            }}],}]);
    const [isFight, setIsFight] = useState<boolean>(false);
    const {id,coins, stageInOfflineArena,selectedPokemon  } = useAppSelector((state) => state.authReducer.value);
    const {click, countOfRichCoins, countOfStage, ids} = useAppSelector((state) => state.achiveReducer.value);
    const dispatch = useDispatch();
    const showModal = (slotId: number) => {
        setIsModalPokemonOpen(true);
        setActiveId(slotId);
    }
    const hideModal = () => {
        setIsModalPokemonOpen(false);
        setActiveId(0);
    }


    const sendResult = async () => {
        if(gameStatus === WIN){
            console.log(gameStatus);
                const response = await UserServices.changeCountOfMoney(id, coins + 10);

        }
        setIsFight(false);
        setGameStatus(EMPTY_STRING);
        setActiveEnemyId(0);
        setActiveId(0);
        setSelectedPokemons([{
            name: '',
            sumaryAttack: 0,
            speed: 0,
            specialAttack: 0,
            sumaryHp: 0,
            specialDefence: 0,
            types: [{type: {
                    name: ''
                }}],
        }, {     name: '',
            sumaryAttack: 0,
            speed: 0,
            specialAttack: 0,
            sumaryHp: 0,
            specialDefence: 0,
            types: [{type: {
                    name: ''
                }}],}, {     name: '',
            sumaryAttack: 0,
            speed: 0,
            specialAttack: 0,
            sumaryHp: 0,
            specialDefence: 0,
            types: [{type: {
                    name: ''
                }}],}]);
        setEnemyPokemons([{
            name: '',
            sumaryAttack: 0,
            speed: 0,
            specialAttack: 0,
            sumaryHp: 0,
            specialDefence: 0,
            types: [{type: {
                    name: ''
                }}],
        }, {     name: '',
            sumaryAttack: 0,
            speed: 0,
            specialAttack: 0,
            sumaryHp: 0,
            specialDefence: 0,
            types: [{type: {
                    name: ''
                }}],}, {     name: '',
            sumaryAttack: 0,
            speed: 0,
            specialAttack: 0,
            sumaryHp: 0,
            specialDefence: 0,
            types: [{type: {
                    name: ''
                }}],}])
    }

    const handleLeave = () => {
        if(isBiggest(selectedPokemons[activeId].speed, enemyPokemons[activeEnemyId].speed)){
            if(activeId === 2){
            const element = document.querySelector('#pokemon__left');
            element.classList.add('pokemon__animation__leave__right');
            setTimeout(() =>{
                    setIsFight(false);
                    element.classList.remove('pokemon__animation__leave__right');
            }, 2000)
                setSelectedPokemons([{
                    name: '',
                    sumaryAttack: 0,
                    speed: 0,
                    specialAttack: 0,
                    sumaryHp: 0,
                    specialDefence: 0,
                    types: [{type: {
                            name: ''
                        }}],
                }, {     name: '',
                    sumaryAttack: 0,
                    speed: 0,
                    specialAttack: 0,
                    sumaryHp: 0,
                    specialDefence: 0,
                    types: [{type: {
                            name: ''
                        }}],}, {     name: '',
                    sumaryAttack: 0,
                    speed: 0,
                    specialAttack: 0,
                    sumaryHp: 0,
                    specialDefence: 0,
                    types: [{type: {
                            name: ''
                        }}],}]);
                setEnemyPokemons([{
                    name: '',
                    sumaryAttack: 0,
                    speed: 0,
                    specialAttack: 0,
                    sumaryHp: 0,
                    specialDefence: 0,
                    types: [{type: {
                            name: ''
                        }}],
                }, {     name: '',
                    sumaryAttack: 0,
                    speed: 0,
                    specialAttack: 0,
                    sumaryHp: 0,
                    specialDefence: 0,
                    types: [{type: {
                            name: ''
                        }}],}, {     name: '',
                    sumaryAttack: 0,
                    speed: 0,
                    specialAttack: 0,
                    sumaryHp: 0,
                    specialDefence: 0,
                    types: [{type: {
                            name: ''
                        }}],}])
            } else{
                setActiveId(prev => prev + 1);
            }
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

    const hitPokemon = () => {
        if(isHit(selectedPokemons[activeId], enemyPokemons[activeEnemyId])){
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
        hitThree(setSelectedPokemons, activeId, setEnemyPokemons, selectedPokemons[activeId].sumaryAttack, enemyPokemons[activeEnemyId].sumaryAttack, activeEnemyId)
        addAchives(id, 'click', click, dispatch, ids, t('Notification.hit'), addClick, t)
    } else if(isYouLose(selectedPokemons[activeId], enemyPokemons[activeEnemyId])){
        const elementEnemy = document.querySelector('#pokemon__right');
        elementEnemy.classList.add('pokemon__animation__left');
        setTimeout(()=>{
            elementEnemy.classList.remove('pokemon__animation__left');
        }, 2000)
        youLoseThree(setSelectedPokemons, activeId, activeEnemyId, setEnemyPokemons, selectedPokemons[activeId].sumaryAttack);
      if(activeId <= 1){
          setActiveId(prev => prev + 1);

      } else if(activeId === 2){
          setGameStatus(LOSE)
      }
    } else if(isYouWin(selectedPokemons[activeId], enemyPokemons[activeEnemyId])){
        const element = document.querySelector('#pokemon__left');
        element.classList.add('pokemon__animation__right');
        setTimeout(()=>{
            element.classList.remove('pokemon__animation__right');
        }, 2000)
        youWinThree(setSelectedPokemons, setEnemyPokemons, enemyPokemons[activeId].sumaryAttack, activeId, activeEnemyId);
        addAchives(id, 'countOfStage', countOfStage, dispatch, ids, t('Notification.stage'), addCountOfStage, t);
        addAchives(id, 'countOfRichCoins', countOfRichCoins, dispatch, ids, t('Notification.winCoins'), addCountOfRichCoins, t);
    if(activeEnemyId <= 1){
        setActiveEnemyId(prev => prev + 1);
    } else if(activeEnemyId === 2){
        setGameStatus(WIN);
    }
        }
    }

    const specialHit = () => {
        const element = document.querySelector('#pokemon__left');
        element.classList.add('pokemon__animation__right');
        setTimeout(()=>{
            element.classList.remove('pokemon__animation__right');
        }, 2000)
        let startDmgCurrentUser = 1;
        selectedPokemons[activeId].types?.forEach((item: Ability) => {
            enemyPokemons[activeEnemyId].types.forEach((type: Ability) => {
                startDmgCurrentUser *= checkTypes(type.type.name, item.type.name);
            })
        })
        hitThree(setSelectedPokemons, activeId, setEnemyPokemons, selectedPokemons[activeId].specialAttack * 100 * startDmgCurrentUser, 0, activeEnemyId);
        if (enemyPokemons[activeEnemyId].sumaryHp - selectedPokemons[activeId].specialAttack * 100 * startDmgCurrentUser <= 0) {
            youWinThree(setSelectedPokemons, setEnemyPokemons, enemyPokemons[activeEnemyId].sumaryAttack, activeId, activeEnemyId);
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
        selectedPokemons[activeId].types?.forEach((item: Ability) => {
            enemyPokemons[activeEnemyId].types.forEach((type: Ability) => {
                startDmgCurrentUser *= checkTypes(type.type.name, item.type.name);
            })
        })
        setSelectedPokemons((prev: FighterT[]) =>{
            return prev.map((item: FighterT, id: number) =>
                activeEnemyId === id ?  {
                    ...item,
                    sumaryHp: item.sumaryHp + (item.specialDefence * 100 * startDmgCurrentUser)
                } : item
            )
        })
    }
    return(<main>
    <Header/>
        <div className={'flex justify-between'}>
        <div className={'flex gap-1 pl-5 flex-col flex-wrap'}>
        <SelectPokemon showModal={showModal} activeId={1} selectedPokemons={selectedPokemons}/>
        <SelectPokemon showModal={showModal} activeId={2} selectedPokemons={selectedPokemons}/>
        <SelectPokemon showModal={showModal} activeId={3} selectedPokemons={selectedPokemons}/>
        </div>
            <div className='flex flex-col items-center justify-center'>
            {!isFight && <Button disabled={selectedPokemons.findIndex(item => item.name === '') >= 0}  variant="contained" endIcon={<SportsKabaddiIcon/>} onClick={() => setIsFight(true)}>{t("Arena.fightButton")}</Button>}
            </div>
            <div className={'flex flex-col flex-wrap'}>
        <ThreeForThreeEnemyPokemon setEnemyPokemons={setEnemyPokemons} idPokemon={1} enemyPokemons={enemyPokemons}/>
        <ThreeForThreeEnemyPokemon setEnemyPokemons={setEnemyPokemons} idPokemon={2} enemyPokemons={enemyPokemons}/>
        <ThreeForThreeEnemyPokemon setEnemyPokemons={setEnemyPokemons} idPokemon={3} enemyPokemons={enemyPokemons}/>
            </div>
        </div>
        {isFight &&  <Box sx={{...STYLES_FOR_MODAL, width: isMobile ? 300 : 800}} className='box__fight'>
            <p className={'text-white'}>Stage {activeId + 1} VS {activeEnemyId + 1}</p>
            <Fighters yourPokemon={selectedPokemons[activeId]} enemyPokemon={enemyPokemons[activeEnemyId]} />
            <ButtonsForFight gameStatus={gameStatus} sendResult={sendResult} handleLeave={handleLeave} hitPokemon={hitPokemon} types={selectedPokemons[activeId].types} specialHealth={specialHealth} specialHit={specialHit}/>
        </Box>}
        <ModalListPokemons activeId={activeId} isModalPokemonOpen={isModalPokemonOpen} hideModal={hideModal} selectedPokemons={selectedPokemons} setSelectedPokemons={setSelectedPokemons} />
    </main>)
}
