'use client'
import {Header} from "@/Header/Header";
import {useEffect, useState} from "react";
import UserServices from "@/services/userServices";
import {useDispatch} from "react-redux";
import {User} from "@/app/arena/user";
import '../globals.css'
import {Box, Modal} from "@mui/material";
import {
    getPokemonInfoById, hit,
    isHit,
    isYouLose,
    isYouWin, youCantLeave, youLose, youWin,
} from "@/functions/pocemons";
import {useAppSelector} from "@/redux/store";
import axios from "axios";
import {
    DEFAULT_LINK, DEFAULT_TEMPLATE_USER_FOR_FIGHT, EMPTY_STRING,
    LOSE,
    NUMBER_ONE,
    STYLES_FOR_MODAL, WIN
} from "@/constants/pokemons";
import {buyElement} from "@/redux/features/auth-slice";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {isTheSame} from "@/functions/logic";
import {GameStatus} from "@/app/storyMode/GameStatus";
import {FightPanel} from "@/app/arena/FIghtPanel";
import {ButtonsForFight} from "@/app/storyMode/ButtonsForFight";
import {EnemyPanel} from "@/app/arena/EnemyPanel";
import {INITIAL_USER} from "@/constants/user";
type UserInfo = {
    data: object[],
    sumaryHp?: number,
    sumaryAttack?: number,
    speed?: number,
    stats?: object[],
    selectedPokemon: string,
}
export default function Arena () {
    const [usersList, setUsersList] = useState([INITIAL_USER]);
    const [selectedUser, setSelectedUser] = useState(DEFAULT_TEMPLATE_USER_FOR_FIGHT);
    const [gameStatus, setGameStatus] = useState(EMPTY_STRING);
    const [isSelectedUser, setIsSelectedUser] = useState(false);
    const [isFight, setIsFight] = useState(false);
    const [statsCurrentUser, setStatsCurrentUser] = useState(DEFAULT_TEMPLATE_USER_FOR_FIGHT)
    const dispatch = useDispatch()
    const selectedPokemon = useAppSelector((state) => state.authReducer.value.selectedPokemon);
    const userEmail = useAppSelector((state) => state.authReducer.value.email);
    const userCoins = useAppSelector((state) => state.authReducer.value.coins);
    const getUsers = async () =>{
        const response = await UserServices.fetchUsers();
        setUsersList(response.data);
    }
    const choiceUserForFight = async (userInfo:UserInfo) =>{
        const userDetailInfo = userInfo;
        userDetailInfo.data = await getPokemonInfoById(userInfo.selectedPokemon);
        userDetailInfo.sumaryHp = (userDetailInfo.data.stats[0].base_stat * userDetailInfo.data.stats[2].base_stat) * (userDetailInfo.data.stats[4].base_stat / 2);
        userDetailInfo.sumaryAttack = userDetailInfo.data.stats[1].base_stat * userDetailInfo.data.stats[3].base_stat;
        userDetailInfo.speed = userDetailInfo.data.stats[5]?.base_stat;
        setSelectedUser(userDetailInfo);
        setIsSelectedUser(true);
    }
    const hitPokemon = () => {
        if(isHit(statsCurrentUser, selectedUser)){
            hit(setStatsCurrentUser, setSelectedUser, statsCurrentUser.sumaryAttack, selectedUser.sumaryAttack)

        } else if(isYouLose(statsCurrentUser, selectedUser)){
            setGameStatus(LOSE)
            youLose(setStatsCurrentUser, setSelectedUser, statsCurrentUser.sumaryAttack);
        } else if(isYouWin(statsCurrentUser, selectedUser)){
            setGameStatus(WIN)
            youWin(setStatsCurrentUser, setSelectedUser, selectedUser.sumaryAttack)
        }
    }

    const handleLeave = () =>{
        if(statsCurrentUser.speed > selectedUser.speed){
            setIsSelectedUser(false);
            setIsFight(false);
        } else{
            youCantLeave()
        }
    }
    const sendResult = async () =>{
        let winner = EMPTY_STRING;
        let reward = NUMBER_ONE;
        if(isTheSame(gameStatus, WIN)){
            winner = userEmail;
            reward += userCoins;
            dispatch(buyElement(reward));
        }else{
            winner = selectedUser.email
            reward += selectedUser.coins
        }
        const response = await UserServices.addCoins(winner, reward);
        setIsSelectedUser(false);
        setIsFight(false);
        setGameStatus(EMPTY_STRING);
    }
    useEmptyAuth()
   useEffect( () => {
       getUsers()
       if(selectedPokemon) {
           axios.get(DEFAULT_LINK + 'pokemon/' + selectedPokemon).then((userDetailInfo) => {
               setStatsCurrentUser((prev) => ({
                   ...prev,
                   sumaryHp: (userDetailInfo.data.stats[0].base_stat * userDetailInfo.data.stats[2].base_stat) * (userDetailInfo.data.stats[4].base_stat / 2),
                   sumaryAttack: userDetailInfo.data.stats[1].base_stat * userDetailInfo.data.stats[3].base_stat,
                   speed: userDetailInfo.data.stats[5]?.base_stat,
               }))
           })
       }
    }, [isSelectedUser]);
    // @ts-ignore
    return(<main>
        <Header/>
        <Modal open={isSelectedUser} onClose={() => {
            setIsSelectedUser(false);
            setIsFight(false);
        }}>
                {isFight ?
                    <Box sx={{ ...STYLES_FOR_MODAL, width: 800 }}>
                        <GameStatus gameStatus={gameStatus}/>
                        <FightPanel statsCurrentUser={statsCurrentUser} selectedPokemon={selectedPokemon} selectedUser={selectedUser}/>
                        <ButtonsForFight gameStatus={gameStatus} sendResult={sendResult} handleLeave={handleLeave} hitPokemon={hitPokemon}/>
                    </Box>
                    : <EnemyPanel selectedUser={selectedUser} setIsFight={setIsFight}/>
                    }
        </Modal>
        <div className='flex items-center'>
            {usersList.map((user) => user.selectedPokemon && <User name={user.userName} selectedPokemon={user.selectedPokemon} coins={user.coins} email={user.email} choiceUserForFight={choiceUserForFight}/>)}
        </div>
    </main>)
}
