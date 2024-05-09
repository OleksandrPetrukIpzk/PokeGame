import Image from "next/image";
import {NUMBER_ONE, NUMBER_ZERO, STYLES_FOR_MODAL} from "@/constants/pokemons";
import {IconPokemon} from "@/components/iconPokemon";
import {Abilities} from "@/components/abilities";
import {Box, Button} from "@mui/material";
import SportsMmaOutlinedIcon from "@mui/icons-material/SportsMmaOutlined";
import {ArenaFightT, OnlineFighters} from "@/constants/types";
import {Dispatch, SetStateAction} from "react";
import {useAppSelector} from "@/redux/store";
import {IMAGE_POTIONS, POTIONS} from "@/constants/user";
import {setPotions} from "@/redux/features/auth-slice";
import {useDispatch} from "react-redux";
import UserServices from "@/services/userServices";
import {isTheSame} from "@/functions/logic";
import {checkTypes} from "@/functions/figts";
import {useTranslate} from "@tolgee/react";

export const EnemyPanel = ({selectedUser, setIsFight, setStatsCurrentUser, statsCurrentUser, setSelectedUser}: {selectedUser: ArenaFightT, setIsFight: Dispatch<SetStateAction<boolean>>,  setStatsCurrentUser: Dispatch<SetStateAction<ArenaFightT>>, statsCurrentUser: ArenaFightT, setSelectedUser: Dispatch<SetStateAction<ArenaFightT>>}) =>{
    const { t } = useTranslate()

    const startFight = async () =>{
        setIsFight(true);
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

                <Button variant="contained" color="error" endIcon={<SportsMmaOutlinedIcon/>} onClick={() => startFight()}>{t('Arena.fight')}</Button>
            </div>
        </div>
       </Box>
}
