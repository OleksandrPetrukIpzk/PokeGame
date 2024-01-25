'use client'
import {Header} from "@/Header/Header";
import {useEffect, useState} from "react";
import UserServices from "@/services/userServices";
import {getAuth} from "@/functions/auth";
import {useDispatch} from "react-redux";
import {User} from "@/app/arena/user";
import '../globals.css'
import {Box, Button, Modal} from "@mui/material";
import {IconPokemon} from "@/IconPokemon/iconPokemon";
import {Abilities} from "@/app/pokemon/[name]/abilities";
import {
    findNamePokemonById,
    findTypesById,
    getPokemonInfoById,
    isHit,
    isYouLose,
    isYouWin,
} from "@/functions/pocemons";
import {useAppSelector} from "@/redux/store";
import axios from "axios";
import {
    DEFAULT_LINK,
    DEFAULT_TEMPLATE_FOR_FIGHT, DEFAULT_TEMPLATE_USER_FOR_FIGHT, EMPTY_STRING,
    LOSE,
    NUMBER_ONE,
    NUMBER_ZERO,
    STYLES_FOR_MODAL, WIN
} from "@/constants/pokemons";
import {buyElement} from "@/redux/features/auth-slice";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import SportsMmaOutlinedIcon from "@mui/icons-material/SportsMmaOutlined";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
type UserInfo = {
    data: object[],
    sumaryHp?: number,
    sumaryAttack?: number,
    speed?: number,
    stats?: object[],
    selectedPokemon: string,
}
export default function Arena () {
    const [usersList, setUsersList] = useState([{}]);
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
            setStatsCurrentUser((prev) => {
                return {
                    ...prev,
                    sumaryHp: prev.sumaryHp - selectedUser.sumaryAttack
                }
            })
            setSelectedUser((prev) => {
                return {
                    ...prev,
                    sumaryHp: prev.sumaryHp - statsCurrentUser.sumaryAttack
                }
            })
        } else if(isYouLose(statsCurrentUser, selectedUser)){
            setGameStatus(LOSE)
            setStatsCurrentUser(prev => {
                return {
                    ...prev,
                    sumaryHp: NUMBER_ZERO
                }
            })
            setSelectedUser((prev) => {
                return {
                    ...prev,
                    sumaryHp: prev.sumaryHp - statsCurrentUser.sumaryAttack
                }
            })
        } else if(isYouWin(statsCurrentUser, selectedUser)){
            setGameStatus(WIN)
            setStatsCurrentUser((prev) => {
                return {
                    ...prev,
                    sumaryHp: prev.sumaryHp - selectedUser.sumaryAttack
                }
            })
            setSelectedUser(prev => {
                return {
                    ...prev,
                    sumaryHp: 0
                }
            })
        }
    }

    const handleLeave = () =>{
        if(statsCurrentUser.speed > selectedUser.speed){
            setIsSelectedUser(false);
            setIsFight(false);
        }
    }
    const sendResult = async () =>{
        let winner = EMPTY_STRING;
        let reward = NUMBER_ONE;
        if(gameStatus === WIN){
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
               setStatsCurrentUser({
                   sumaryHp: (userDetailInfo.data.stats[0].base_stat * userDetailInfo.data.stats[2].base_stat) * (userDetailInfo.data.stats[4].base_stat / 2),
                   sumaryAttack: userDetailInfo.data.stats[1].base_stat * userDetailInfo.data.stats[3].base_stat,
                   speed: userDetailInfo.data.stats[5]?.base_stat,
               })
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
                    <p>{!gameStatus ? 'Fight' : 'Finish game'}</p>
                        {gameStatus && <p>{gameStatus === 'Win' ? 'You win' : selectedUser.userName + ' win'}</p>}
                     <div className='flex justify-between'>
                        <div> <p>{statsCurrentUser.sumaryHp}</p>
                            <IconPokemon id={selectedPokemon}/>  </div>
                         <p>VS</p>
                         <div> <p>{selectedUser.sumaryHp}</p>
                         <IconPokemon id={selectedUser.selectedPokemon}/>
                         </div>
                         </div>
                        {!gameStatus && <Button endIcon={<SportsMmaOutlinedIcon/>} onClick={() => hitPokemon()}>Hit</Button>}
                        {!gameStatus && <Button endIcon={<DirectionsRunIcon/>} onClick={() => handleLeave()}>Leave</Button>}
                        {gameStatus && <Button endIcon={<AssignmentTurnedInIcon/>} onClick={() => sendResult()}>Finish game</Button>}
                    </Box>
                    :<Box sx={{ ...STYLES_FOR_MODAL, width: 400 }}> <IconPokemon id={selectedUser?.data?.name}/>
                <p>User: {selectedUser.userName}</p>
                <p>Pokemon name: {selectedUser?.data?.name}</p>
              <div className='flex'> <p>Types:</p> <Abilities types={selectedUser?.data?.types} isLoaded={false}/></div>
                <Button endIcon={<SportsMmaOutlinedIcon/>} onClick={() => setIsFight(true)}>Lets fight</Button></Box>}
        </Modal>
        <div className='flex items-center'>
            {usersList.map((user) => user.selectedPokemon && <User name={user.userName} selectedPokemon={user.selectedPokemon} coins={user.coins} email={user.email} choiceUserForFight={choiceUserForFight}/>)}
        </div>
    </main>)
}
