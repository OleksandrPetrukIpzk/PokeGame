import Image from "next/image";
import {NUMBER_ONE, STYLES_FOR_MODAL} from "@/constants/pokemons";
import {IconPokemon} from "@/IconPokemon/iconPokemon";
import {Abilities} from "@/app/pokemon/[name]/abilities";
import {Box, Button} from "@mui/material";
import SportsMmaOutlinedIcon from "@mui/icons-material/SportsMmaOutlined";
import {OnlineFighters} from "@/constants/types";
import {Dispatch, SetStateAction} from "react";
import {useAppSelector} from "@/redux/store";
import {IMAGE_POTIONS, POTIONS} from "@/constants/user";
import {setPotions} from "@/redux/features/auth-slice";
import {useDispatch} from "react-redux";
import UserServices from "@/services/userServices";

export const EnemyPanel = ({selectedUser, setIsFight, activeID, setActiveID, setStatsCurrentUser}: {selectedUser: OnlineFighters, setIsFight: Dispatch<SetStateAction<boolean>>, activeID: number, setActiveID: Dispatch<SetStateAction<number>>, statsCurrentUser: Dispatch<SetStateAction<any>>}) =>{
    const arrPotions = useAppSelector((state) => state.authReducer.value.arrPotions);
    const id = useAppSelector((state) => state.authReducer.value.id);
    const dispatch = useDispatch();
    const startFight = async () =>{
        setIsFight(true);
        if(activeID > 0){
            const updatedArrPotions = JSON.parse(JSON.stringify(arrPotions));
            let index = 0;
            if(arrPotions.findIndex(item => item.id.toString() === activeID.toString()) !== -1){
                index = arrPotions.findIndex(item => item.id === activeID);
                const updateCount = updatedArrPotions[index].count - NUMBER_ONE;
                updatedArrPotions[index].count = updateCount;
            } else {
                index = POTIONS.findIndex(item => item.id === activeID);
                updatedArrPotions?.push(POTIONS[index]);
            }
            dispatch(setPotions(updatedArrPotions));
            await UserServices.setPotions(id, updatedArrPotions);
            if(activeID === 2){
                setStatsCurrentUser(prev =>{
                    return {
                        ...prev,
                        sumaryHp: prev.sumaryHp * 2,
                    }
                })
            }
            if(activeID === 3){
                setStatsCurrentUser(prev =>{
                    return {
                        ...prev,
                        sumaryAttack: prev.sumaryAttack * 2,
                    }
                })
            }
        }
    }
    return <Box sx={{ ...STYLES_FOR_MODAL, width: 400 }}>
        <div className='flex justify-between  items-start mb-5'>
            <IconPokemon id={selectedUser?.data?.name} size={100}/>
            <div className='flex flex-col'>
                <p>Name: {selectedUser.data.name}</p>
                <p>Types:</p>
                <Abilities types={selectedUser?.data?.types} isLoaded={false}/>
                <p>Select potions:</p>
                {arrPotions.map(potion => {
                    const indexIMG = IMAGE_POTIONS.findIndex(item => item.id === potion.id);
                   return potion.count > 0 && <Button variant={activeID === potion.id ? 'contained' : 'outlined'} onClick={() => setActiveID(potion.id)}>
                    <Image src={IMAGE_POTIONS[indexIMG].image} alt={potion.name} width={50} height={50}/>
                       <p>{potion.name}, count: {potion.count}</p>
                   </Button>
                })}
                <Button variant="contained" color="error" endIcon={<SportsMmaOutlinedIcon/>} onClick={() => startFight()}>Lets fight</Button>
            </div>
        </div>
       </Box>
}
