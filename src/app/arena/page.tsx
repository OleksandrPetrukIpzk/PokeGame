'use client'
import {Header} from "@/components/Header";
import {useEffect, useState} from "react";
import UserServices from "@/services/userServices";
import {useDispatch} from "react-redux";
import {User} from "@/components/user";
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
import {GameStatus} from "@/components/GameStatus";
import {FightPanel} from "@/components/FIghtPanel";
import {ButtonsForFight} from "@/components/ButtonsForFight";
import {EnemyPanel} from "@/components/EnemyPanel";
import {INITIAL_USER} from "@/constants/user";
import {addAchives} from "@/functions/achives";
import {addClick, addCountOfLose, addCountOfRichCoins, addCountOfWins} from "@/redux/features/achievements";
import {changeCountOfMoney} from "@/redux/features/auth-slice";
import {checkTypes, sendWinner} from "@/functions/figts";
import {useTranslate} from "@tolgee/react";
import {IUser} from "@/models/user";
import {Ability, ArenaFightT, FighterT} from "@/constants/types";
import {PotionPanel} from "@/components/PotionPanel";
type UserInfo = {
    data: {
        stats: {
            base_stat: number
        }[],
        types: Ability[],
    },
    sumaryHp?: number,
    sumaryAttack?: number,
    speed?: number,
    stats?: object[],
    selectedPokemon: string,
    types: Ability[],
}
export default function Arena () {
    const {t} = useTranslate()
    const [usersList, setUsersList] = useState([INITIAL_USER]);
    const [selectedUser, setSelectedUser] = useState<ArenaFightT>(DEFAULT_TEMPLATE_USER_FOR_FIGHT);
    const [gameStatus, setGameStatus] = useState(EMPTY_STRING);
    const [isSelectedUser, setIsSelectedUser] = useState(false);
    const [isFight, setIsFight] = useState(false);
    const [statsCurrentUser, setStatsCurrentUser] = useState<ArenaFightT>(DEFAULT_TEMPLATE_USER_FOR_FIGHT);
    const dispatch = useDispatch()
    const {selectedPokemon, id, rang, name, coins} = useAppSelector((state) => state.authReducer.value);
    const [rewardRang, setRewardRang] = useState(rang);
    const [rewardCoins, setRewardCoins] = useState(coins);
    const {click, countOfWins, countOfLose, countOfRichCoins, ids} = useAppSelector((state) => state.achiveReducer.value);
    const filterUsers = (users: IUser[], radius: number): IUser[] => {
        const filteredUsers: IUser[] = users.filter(user =>Math.abs(user.rang - rang) <= radius);
        if(filteredUsers.length < 4){
            return filterUsers(users, radius + 20);
        }
        return filteredUsers;
    }
    const getUsers = async () =>{
        const response = await UserServices.getAll();
        const users = response.data;
        const filteredUsers = filterUsers(users, 20);
        const sortedFiltered = filteredUsers.sort((a, b) => b.rang - a.rang)
        setUsersList(sortedFiltered);
    }



    const choiceUserForFight = async (userInfo:UserInfo) =>{
        const userDetailInfo = userInfo;
        userDetailInfo.data = await getPokemonInfoById(userInfo.selectedPokemon);
        userDetailInfo.sumaryHp = (userDetailInfo.data.stats[0].base_stat * userDetailInfo.data.stats[2].base_stat) * (userDetailInfo.data.stats[4].base_stat / 2);
        userDetailInfo.sumaryAttack = userDetailInfo.data.stats[1].base_stat * userDetailInfo.data.stats[3].base_stat;
        userDetailInfo.speed = userDetailInfo.data.stats[5]?.base_stat;
        userDetailInfo.types = userDetailInfo.data.types;
        setSelectedUser(userDetailInfo);
        setIsSelectedUser(true);
    }

    const handleChoicePotion = (idPotion: number) =>{
        switch(idPotion){
            case 1:{
                // todo: add animation
                setStatsCurrentUser(prev => {
                    return {
                        ...prev,
                        speed: prev.sumaryAttack + 100000
                    }
                });
                break;
            }
            case 2: {
                setStatsCurrentUser(prev =>{
                    return {
                        ...prev,
                        sumaryHp: prev.sumaryHp * 2,
                    }
                });
                break;
            }
            case 3: {
                setStatsCurrentUser(prev =>{
                    return {
                        ...prev,
                        sumaryAttack: prev.sumaryAttack * 2,
                    }
                })
                break;
            }
            case 4:{
                setRewardRang(prev => prev + 20);
                break;
            }
            case 5: {
                const element = document.querySelector('#pokemon__left');
                element.classList.add('pokemon__animation__right');
                setTimeout(()=>{
                    element.classList.remove('pokemon__animation__right');
                }, 2000)
                setGameStatus(WIN);
                youWin(setStatsCurrentUser, setSelectedUser, 0);
                sendWinner(name, selectedUser.name,  name, id, rewardRang, selectedUser.id, selectedUser.rang);
                addAchives(id, 'countOfWins', countOfWins, dispatch, ids, t("Notification.win"), addCountOfWins, t);
                addAchives(id, 'countOfRichCoins', countOfRichCoins, dispatch, ids, t("Notification.winCoins"), addCountOfRichCoins, t);
                break;
            }
            case 6: {
                setRewardRang(prev => prev + 1);
                break;
            }
            case 7: {
                // todo: add animation
                setStatsCurrentUser(prev => {
                   return {
                       ...prev,
                       sumaryAttack: prev.sumaryAttack + selectedUser.sumaryAttack
                   }
                });
                setSelectedUser(prev => {
                    return {
                        ...prev,
                        sumaryAttack: prev.sumaryAttack / 2
                    }
                });
                break;
            }
        }

    }

    const hitPokemon = () => {
            if(isHit(statsCurrentUser, selectedUser)){
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
                    hit(setStatsCurrentUser, setSelectedUser, statsCurrentUser.sumaryAttack, selectedUser.sumaryAttack);
                addAchives(id, 'click', click, dispatch, ids, t("Notification.hit"), addClick, t)

            } else if(isYouLose(statsCurrentUser, selectedUser)){
                const elementEnemy = document.querySelector('#pokemon__right');
                elementEnemy.classList.add('pokemon__animation__left');
                setTimeout(()=>{
                    elementEnemy.classList.remove('pokemon__animation__left');
                }, 2000)
                setGameStatus(LOSE)
                youLose(setStatsCurrentUser, setSelectedUser, statsCurrentUser.sumaryAttack);
                sendWinner(name, selectedUser.name,  selectedUser.name, selectedUser.id, selectedUser.rang, id, rewardRang)
                addAchives(id, 'countOfLose', countOfLose, dispatch, ids, t("Notification.lose"), addCountOfLose, t);
            } else if(isYouWin(statsCurrentUser, selectedUser)){
                const element = document.querySelector('#pokemon__left');
                element.classList.add('pokemon__animation__right');
                setTimeout(()=>{
                    element.classList.remove('pokemon__animation__right');
                }, 2000)
                setGameStatus(WIN)
                youWin(setStatsCurrentUser, setSelectedUser, selectedUser.sumaryAttack)
                    sendWinner(name, selectedUser.name,  name, id, rewardRang, selectedUser.id, selectedUser.rang)
                addAchives(id, 'countOfWins', countOfWins, dispatch, ids, t("Notification.win"), addCountOfWins, t)
                addAchives(id, 'countOfRichCoins', countOfRichCoins, dispatch, ids, t("Notification.winCoins"), addCountOfRichCoins, t)
            }

    }
    const specialHit = () =>{
        const element = document.querySelector('#pokemon__left');
        element.classList.add('pokemon__animation__right');
        setTimeout(()=>{
            element.classList.remove('pokemon__animation__right');
        }, 2000)
        let startDmgCurrentUser = 1;
        selectedUser.types?.forEach(item => {
            statsCurrentUser.types.forEach((type: any) => {
                startDmgCurrentUser *= checkTypes(type.type.name, item.type.name);
            })
        })
        hit(setStatsCurrentUser, setSelectedUser, statsCurrentUser.specialAttack * 100 * startDmgCurrentUser, 0);
        if(selectedUser.sumaryHp - statsCurrentUser.specialAttack * 100 * startDmgCurrentUser <= 0){
            setGameStatus(WIN)
            youWin(setStatsCurrentUser, setSelectedUser, selectedUser.sumaryAttack)
                sendWinner(name, selectedUser.name,  name, id, rewardRang, selectedUser.id, selectedUser.rang,)
            addAchives(id, 'countOfWins', countOfWins, dispatch, ids, t("Notification.win"), addCountOfWins, t)
            addAchives(id, 'countOfRichCoins', countOfRichCoins, dispatch, ids, t("Notification.winCoins"), addCountOfRichCoins, t)
        }
    }

    const specialHealth = () => {
        const element = document.querySelector('.health__true');
        element.classList.add('health__animation__true');
        setTimeout(() => {
            element.classList.remove('health__animation__true');
        }, 2000)
        let startDmgCurrentUser = 1;
        selectedUser.types?.forEach(item => {
            statsCurrentUser.types.forEach((type: any) => {
                startDmgCurrentUser *= checkTypes(type.type.name, item.type.name);
            })
        })
        setStatsCurrentUser(prev =>{
            return{
                ...prev,
                sumaryHp: prev.sumaryHp + (prev.specialDefence * 100 * startDmgCurrentUser)
            }
        })
    }
    const handleLeave = () =>{
        if(statsCurrentUser.speed > selectedUser.speed){
            const element = document.querySelector('#pokemon__left');
            element.classList.add('pokemon__animation__leave__right');
            setTimeout(() =>{
                setIsFight(false);
                setIsSelectedUser(false);
                element.classList.remove('pokemon__animation__leave__right');
            }, 2000)
        } else{
            youCantLeave()
            const element = document.querySelector('#pokemon__left');
            element.classList.add('pokemon__animation__cantLeave__right');
            setTimeout(()=>{
                element.classList.remove('pokemon__animation__cantLeave__right');
            }, 2000)
        }
    }
    const sendResult = async () =>{
        let winner = EMPTY_STRING;
        let reward = NUMBER_ONE;
        if(isTheSame(gameStatus, WIN)){
            winner = id;
           setRewardCoins(prev => prev + 1);
            dispatch(changeCountOfMoney(rewardCoins));
        }else{
            winner = selectedUser.id
            reward += selectedUser.coins
        }
        const response = await UserServices.changeCountOfMoney(winner, reward);
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
                   specialAttack: userDetailInfo.data.stats[3].base_stat,
                   specialDefence: userDetailInfo.data.stats[4].base_stat,
                   types: userDetailInfo.data.types
               }))
           })
       }
    }, [isSelectedUser, rang]);
    return(<main>
        <Header/>
        <Modal open={isSelectedUser} onClose={() => {
            setIsSelectedUser(false);
            setIsFight(false);
        }}>
                {isFight ?
                    <Box sx={{ ...STYLES_FOR_MODAL, width: 800 }} className='box__fight'>
                        <GameStatus gameStatus={gameStatus}/>
                        <FightPanel statsCurrentUser={statsCurrentUser} selectedPokemon={selectedPokemon} selectedUser={selectedUser}/>
                        <ButtonsForFight gameStatus={gameStatus} sendResult={sendResult} handleLeave={handleLeave} hitPokemon={hitPokemon} types={statsCurrentUser.types} specialHit={specialHit} specialHealth={specialHealth}/>
                        <PotionPanel handleChange={handleChoicePotion}/>
                    </Box>
                    : <EnemyPanel selectedUser={selectedUser} setIsFight={setIsFight} setStatsCurrentUser={setStatsCurrentUser} statsCurrentUser={statsCurrentUser} setSelectedUser={setSelectedUser}/>
                    }
        </Modal>
        <div>
            {usersList.map((user) => user.selectedPokemon && user.name !== name && <User id={user._id} img={user.img} rang={user.rang} name={user.name} selectedPokemon={user.selectedPokemon} coins={user.coins} email={user.email} choiceUserForFight={choiceUserForFight} userHp={statsCurrentUser.sumaryHp} userAttack={statsCurrentUser.sumaryAttack} userSpeed={statsCurrentUser.speed}/>)}
        </div>
    </main>)
}
