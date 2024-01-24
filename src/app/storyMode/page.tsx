'use client'
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@/redux/store";
import axios from "axios";
import {
    DEFAULT_LINK,
    DEFAULT_TEMPLATE_FOR_FIGHT,
    EMPTY_STRING, LOSE, NUMBER_ONE, NUMBER_ZERO,
    STYLES_FOR_MODAL, WIN
} from "@/constants/pokemons";
import {Header} from "@/Header/Header";
import '../globals.css'
import Image from "next/image";
import {Box, Button} from "@mui/material";
import UserServices from "@/services/userServices";
import {changeStage} from "@/redux/features/auth-slice";
import {checkCurrentImage, isHit, isYouLose, isYouWin} from "@/functions/pocemons";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SportsMmaOutlinedIcon from '@mui/icons-material/SportsMmaOutlined';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
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
            setYourPokemon((prev) => {
                return {
                    ...prev,
                    sumaryHp: prev.sumaryHp - enemyPokemon.sumaryAttack
                }
            })
            setEnemyPokemon((prev) => {
                return {
                    ...prev,
                    sumaryHp: prev.sumaryHp - yourPokemon.sumaryAttack
                }
            })
        } else if(isYouLose(yourPokemon, enemyPokemon)){
            setGameStatus(LOSE)
            setYourPokemon(prev => {
                return {
                    ...prev,
                    sumaryHp: NUMBER_ZERO
                }
            })
            setEnemyPokemon((prev) => {
                return {
                    ...prev,
                    sumaryHp: prev.sumaryHp - yourPokemon.sumaryAttack
                }
            })
        } else if(isYouWin(yourPokemon, enemyPokemon)){
            setGameStatus(WIN)
            setYourPokemon((prev) => {
                return {
                    ...prev,
                    sumaryHp: prev.sumaryHp - enemyPokemon.sumaryAttack
                }
            })
            setEnemyPokemon(prev => {
                return {
                    ...prev,
                    sumaryHp: NUMBER_ZERO
                }
            })
        }
    }
    const handleLeave = () =>{
        if(yourPokemon.speed > enemyPokemon.speed){
            setIsFight(false);
        }
    }

    const sendResult = async () =>{
        if(gameStatus === WIN){
            const response = await UserServices.addCoins(email, coins + NUMBER_ONE);
            await UserServices.nextStage(stageInOfflineArena + NUMBER_ONE);
            dispatch(changeStage(stageInOfflineArena + NUMBER_ONE));
        }
        setIsFight(false);
        setGameStatus(EMPTY_STRING);
    }

    useEmptyAuth([stageInOfflineArena])
    useEffect(() => {
        axios.get(DEFAULT_LINK + 'pokemon/' + stageInOfflineArena).then(resolve => {
            setEnemyPokemon({
                name: resolve.data.name,
                img: checkCurrentImage(resolve.data.sprites),
                sumaryHp: (resolve.data.stats[0].base_stat * resolve.data.stats[2].base_stat) * (resolve.data.stats[4].base_stat / 2),
                sumaryAttack: resolve.data.stats[1].base_stat * resolve.data.stats[3].base_stat,
                speed: resolve.data.stats[5]?.base_stat
            })
        })
        if(selectedPokemon) {
            axios.get(DEFAULT_LINK + 'pokemon/' + selectedPokemon).then((resolve: any) => {
                setYourPokemon({
                    name: resolve.data.name,
                    img: checkCurrentImage(resolve.data.sprites),
                    sumaryHp: (resolve.data.stats[0].base_stat * resolve.data.stats[2].base_stat) * (resolve.data.stats[4].base_stat / 2),
                    sumaryAttack: resolve.data.stats[1].base_stat * resolve.data.stats[3].base_stat,
                    speed: resolve.data.stats[5]?.base_stat
                })
            })
        }
    },[stageInOfflineArena])

    return(<>
        <main className='main'>
            <Header/>
            {isFight && <Box sx={{...STYLES_FOR_MODAL, width: 800}}>
                <div>
                    <p>{!gameStatus ? 'Fight' : 'Finish game'}</p>
                    {gameStatus && <p>{gameStatus === 'Win' ? 'You win' : 'You lose'}</p>}
                </div>
                <div className='flex justify-between'>
                    <div>
                     <p>{yourPokemon.sumaryHp}</p>
                        <Image src={yourPokemon.img} alt={yourPokemon.img} width={100} height={100}/>
                    </div>
                    <p>VS</p>
                    <div>
                        <p>{enemyPokemon.sumaryHp}</p>
                        <Image src={enemyPokemon.img} alt={enemyPokemon.img} width={100} height={100}/>
                    </div>
                </div>
                <div>
                {!gameStatus && <Button endIcon={<SportsMmaOutlinedIcon/>} onClick={() => hitPokemon()}>Hit</Button>}
                {!gameStatus && <Button endIcon={<DirectionsRunIcon/>} onClick={() => handleLeave()}>Leave</Button>}
                {gameStatus && <Button endIcon={<AssignmentTurnedInIcon/>} onClick={() => sendResult()}>Finish game</Button>}
                </div>
            </Box>}
            <div className='flex justify-between items-center'>
                <div className='text-center'>
                    <p>{yourPokemon.name}</p>
                    <Image src={yourPokemon.img} alt={yourPokemon.img} width={200} height={200}/>
                </div>
                <div className='flex flex-col items-center justify-center'>
                <p>VS</p>
                    <Button endIcon={<SportsKabaddiIcon/>} onClick={() => setIsFight(true)}>Fight</Button>
                </div>
                <div className='text-center'>
                    <p>{enemyPokemon.name}</p>
                    <Image src={enemyPokemon.img} alt={enemyPokemon.img} width={200} height={200}/>
                </div>
            </div>
        </main>
    </>)
}