import {STYLES_FOR_MODAL} from "@/constants/pokemons";
import {IconPokemon} from "@/components/iconPokemon";
import {Abilities} from "@/components/abilities";
import {Box, Button} from "@mui/material";
import SportsMmaOutlinedIcon from "@mui/icons-material/SportsMmaOutlined";
import {ArenaFightT, OnlineFighters} from "@/constants/types";
import {Dispatch, SetStateAction} from "react";
import {checkTypes} from "@/functions/figts";
import {useTranslate} from "@tolgee/react";

export const EnemyPanel = ({selectedUser, setIsFight, setStatsCurrentUser, statsCurrentUser, setSelectedUser}: {selectedUser: any, setIsFight: Dispatch<SetStateAction<boolean>>,  setStatsCurrentUser: Dispatch<SetStateAction<ArenaFightT>>, statsCurrentUser: ArenaFightT, setSelectedUser: Dispatch<SetStateAction<ArenaFightT>>}) =>{
    const { t } = useTranslate()

    const startFight = async () =>{
        setIsFight(true);
        let startDmgCurrentUser = 1;
        let startDmgSelectedUser = 1;
        // @ts-ignore
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
    // @ts-ignore
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
