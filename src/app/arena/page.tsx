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
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {isTheSame} from "@/functions/logic";
import {GameStatus} from "@/app/storyMode/GameStatus";
import {FightPanel} from "@/app/arena/FIghtPanel";
import {ButtonsForFight} from "@/app/storyMode/ButtonsForFight";
import {EnemyPanel} from "@/app/arena/EnemyPanel";
import {INITIAL_USER} from "@/constants/user";
import {addAchives} from "@/functions/achives";
import {addClick, addCountOfLose, addCountOfRichCoins, addCountOfWins} from "@/redux/features/achievements";
import {changeCountOfMoney} from "@/redux/features/auth-slice";
import {sendWinner} from "@/functions/figts";
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
    const [statsCurrentUser, setStatsCurrentUser] = useState(DEFAULT_TEMPLATE_USER_FOR_FIGHT);
    const [activeID, setActiveID] = useState(0);
    const dispatch = useDispatch()
    const selectedPokemon = useAppSelector((state) => state.authReducer.value.selectedPokemon);
    const userId = useAppSelector((state) => state.authReducer.value.id);
    const rang = useAppSelector((state) => state.authReducer.value.rang);
    const name =  useAppSelector((state) => state.authReducer.value.name);
    const userCoins = useAppSelector((state) => state.authReducer.value.coins);
    const click = useAppSelector((state) => state.achiveReducer.value.click)
    const countOfWins = useAppSelector(state => state.achiveReducer.value.countOfWins)
    const countOfLose = useAppSelector(state => state.achiveReducer.value.countOfLose)
    const countOfRichCoins = useAppSelector(state => state.achiveReducer.value.countOfRichCoins)
    const ids  = useAppSelector((state) => state.achiveReducer.value.ids)
    const getUsers = async () =>{
        const response = await UserServices.getAll();
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
        if(activeID === 5){
            setGameStatus(WIN);
            youWin(setStatsCurrentUser, setSelectedUser, 0);
            sendWinner(name, selectedUser.name,  name, userId, rang, selectedUser.id, selectedUser.rang);
            addAchives(userId, 'countOfWins', countOfWins, dispatch, ids, 'you win enemy ', addCountOfWins);
            addAchives(userId, 'countOfRichCoins', countOfRichCoins, dispatch, ids, 'You win coins ', addCountOfRichCoins);
        } else{
            if(isHit(statsCurrentUser, selectedUser)){
                if(activeID === 7){
                    hit(setStatsCurrentUser, setSelectedUser, statsCurrentUser.sumaryAttack + selectedUser.sumaryAttack, selectedUser.sumaryAttack / 2);
                } else{
                    hit(setStatsCurrentUser, setSelectedUser, statsCurrentUser.sumaryAttack, selectedUser.sumaryAttack);
                }

                addAchives(userId, 'click', click, dispatch, ids, 'you hit enemy ', addClick)

            } else if(isYouLose(statsCurrentUser, selectedUser)){
                setGameStatus(LOSE)
                youLose(setStatsCurrentUser, setSelectedUser, statsCurrentUser.sumaryAttack);
                sendWinner(name, selectedUser.name,  selectedUser.name, selectedUser.id, selectedUser.rang, userId, rang)
                addAchives(userId, 'countOfLose', countOfLose, dispatch, ids, 'you lose enemy ', addCountOfLose);
            } else if(isYouWin(statsCurrentUser, selectedUser)){
                setGameStatus(WIN)
                youWin(setStatsCurrentUser, setSelectedUser, selectedUser.sumaryAttack)
                if(activeID === 4){
                    sendWinner(name, selectedUser.name,  name, userId, rang + 20, selectedUser.id, selectedUser.rang)
                }
                else {
                    sendWinner(name, selectedUser.name,  name, userId, rang, selectedUser.id, selectedUser.rang,)
                }
                addAchives(userId, 'countOfWins', countOfWins, dispatch, ids, 'you win enemy ', addCountOfWins)
                addAchives(userId, 'countOfRichCoins', countOfRichCoins, dispatch, ids, 'You win coins ', addCountOfRichCoins)
            }
        }
    }

    const handleLeave = () =>{
        if(statsCurrentUser.speed > selectedUser.speed || activeID === 1){
            setIsSelectedUser(false);
            setIsFight(false);
            setActiveID(0);
        } else{
            youCantLeave()
        }
    }
    const sendResult = async () =>{
        let winner = EMPTY_STRING;
        let reward = NUMBER_ONE;
        if(isTheSame(gameStatus, WIN)){
            winner = userId;
            if(activeID === 6){
                reward += userCoins + reward;
            }
            else{
                reward += userCoins;
            }
            dispatch(changeCountOfMoney(reward));
        }else{
            winner = selectedUser.id
            reward += selectedUser.coins
        }
        const response = await UserServices.changeCountOfMoney(winner, reward);
        setIsSelectedUser(false);
        setIsFight(false);
        setGameStatus(EMPTY_STRING);
        setActiveID(0);
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
    return(<main>
        <Header/>
        <Modal open={isSelectedUser} onClose={() => {
            setIsSelectedUser(false);
            setIsFight(false);
        }}>
                {isFight ?
                    <Box sx={{ ...STYLES_FOR_MODAL, width: 500 }} className='box__fight'>
                        <GameStatus gameStatus={gameStatus}/>
                        <FightPanel statsCurrentUser={statsCurrentUser} selectedPokemon={selectedPokemon} selectedUser={selectedUser}/>
                        <ButtonsForFight gameStatus={gameStatus} sendResult={sendResult} handleLeave={handleLeave} hitPokemon={hitPokemon}/>
                    </Box>
                    : <EnemyPanel selectedUser={selectedUser} setIsFight={setIsFight} activeID={activeID} setActiveID={setActiveID} setStatsCurrentUser={setStatsCurrentUser}/>
                    }
        </Modal>
        <div className=''>
            {usersList.map((user) => user.selectedPokemon && user.name !== name && <User id={user._id} img={user.img} rang={user.rang} name={user.name} selectedPokemon={user.selectedPokemon} coins={user.coins} email={user.email} choiceUserForFight={choiceUserForFight} userHp={statsCurrentUser.sumaryHp} userAttack={statsCurrentUser.sumaryAttack} userSpeed={statsCurrentUser.speed}/>)}
        </div>
    </main>)
}
