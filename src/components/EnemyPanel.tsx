import Image from "next/image";
import {NUMBER_ONE, NUMBER_ZERO, STYLES_FOR_MODAL} from "@/constants/pokemons";
import {IconPokemon} from "@/components/iconPokemon";
import {Abilities} from "@/components/abilities";
import {Box, Button} from "@mui/material";
import SportsMmaOutlinedIcon from "@mui/icons-material/SportsMmaOutlined";
import {OnlineFighters} from "@/constants/types";
import {Dispatch, SetStateAction} from "react";
import {useAppSelector} from "@/redux/store";
import {IMAGE_POTIONS, POTIONS} from "@/constants/user";
import {setPotions} from "@/redux/features/auth-slice";
import {useDispatch} from "react-redux";
import UserServices from "@/services/userServices";
import {isTheSame} from "@/functions/logic";
import {checkTypes} from "@/functions/figts";
import {useTranslate} from "@tolgee/react";

export const EnemyPanel = ({selectedUser, setIsFight, activeID, setActiveID, setStatsCurrentUser, statsCurrentUser, setSelectedUser}: {selectedUser: OnlineFighters, setIsFight: Dispatch<SetStateAction<boolean>>, activeID: number, setActiveID: Dispatch<SetStateAction<number>>, setStatsCurrentUser: Dispatch<SetStateAction<any>>, statsCurrentUser: any, setSelectedUser: Dispatch<SetStateAction<any>>}) =>{
    const { t } = useTranslate()
    const arrPotions = useAppSelector((state) => state.authReducer.value.arrPotions);
    const id = useAppSelector((state) => state.authReducer.value.id);
    const dispatch = useDispatch();
    const startFight = async () =>{
        setIsFight(true);
        if(activeID > NUMBER_ZERO){
            const updatedArrPotions = JSON.parse(JSON.stringify(arrPotions));
            let index = NUMBER_ZERO;
            if(!isTheSame(arrPotions.findIndex(item => isTheSame(item.id.toString(), activeID.toString())), -1)){
                index = arrPotions.findIndex(item => isTheSame(item.id, activeID));
                const updateCount = updatedArrPotions[index].count - NUMBER_ONE;
                updatedArrPotions[index].count = updateCount;
            } else {
                index = POTIONS.findIndex(item => isTheSame(item.id, activeID));
                updatedArrPotions?.push(POTIONS[index]);
            }
            dispatch(setPotions(updatedArrPotions));
            await UserServices.setPotions(id, updatedArrPotions);
            if(isTheSame(activeID, 2)){
                setStatsCurrentUser(prev =>{
                    return {
                        ...prev,
                        sumaryHp: prev.sumaryHp * 2,
                    }
                })
            }
            if(isTheSame(activeID, 3)){
                setStatsCurrentUser(prev =>{
                    return {
                        ...prev,
                        sumaryAttack: prev.sumaryAttack * 2,
                    }
                })
            }
        }
        let startDmgCurrentUser = 1;
        let startDmgSelectedUser = 1;
        selectedUser.types?.forEach(item => {
            statsCurrentUser.types.forEach((type: any) => {
                startDmgCurrentUser *= checkTypes(type.type.name, item.type.name);
                startDmgSelectedUser *= checkTypes(item.type.name, type.type.name);
            })
        })
        setStatsCurrentUser(prev => {
            return{
                ...prev,
                sumaryAttack: prev.sumaryAttack * startDmgCurrentUser
            }
        })
        setSelectedUser(prev => {
            return{
                ...prev,
                sumaryAttack: prev.sumaryAttack * startDmgSelectedUser
            }
        })
    }
    return <Box sx={{ ...STYLES_FOR_MODAL, width: 400 }}>
        <div className='flex justify-between  items-start mb-5'>
            <IconPokemon id={selectedUser?.data?.name} size={100}/>
            <div className='flex flex-col'>
                <p>{t('Arena.nameOfPlayer')} {selectedUser.data.name}</p>
                <p>{t('Arena.typesOfPokemon')}</p>
                <Abilities types={selectedUser?.types} isLoaded={false}/>
                <p>{t('Arena.choicePotion')}</p>
                {arrPotions.map(potion => {
                    const indexIMG = IMAGE_POTIONS.findIndex(item => item.id === potion.id);
                   return potion.count > 0 && <Button variant={activeID === potion.id ? 'contained' : 'outlined'} onClick={() => setActiveID(potion.id)}>
                    <Image src={IMAGE_POTIONS[indexIMG].image} alt={potion.name} width={50} height={50}/>
                       <p>{potion.name}, {t('Arena.countOfPotion')} {potion.count}</p>
                   </Button>
                })}
                <Button variant="contained" color="error" endIcon={<SportsMmaOutlinedIcon/>} onClick={() => startFight()}>{t('Arena.fight')}</Button>
            </div>
        </div>
       </Box>
}
