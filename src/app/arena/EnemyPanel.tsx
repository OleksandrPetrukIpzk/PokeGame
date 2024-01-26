import {STYLES_FOR_MODAL} from "@/constants/pokemons";
import {IconPokemon} from "@/IconPokemon/iconPokemon";
import {Abilities} from "@/app/pokemon/[name]/abilities";
import {Box, Button} from "@mui/material";
import SportsMmaOutlinedIcon from "@mui/icons-material/SportsMmaOutlined";
import {OnlineFighters} from "@/constants/types";
import {Dispatch, SetStateAction} from "react";

export const EnemyPanel = ({selectedUser, setIsFight}: {selectedUser: OnlineFighters, setIsFight: Dispatch<SetStateAction<boolean>>}) =>{

    return <Box sx={{ ...STYLES_FOR_MODAL, width: 400 }}> <IconPokemon id={selectedUser?.data?.name}/>
        <p>User: {selectedUser.userName}</p>
        <p>Pokemon name: {selectedUser?.data?.name}</p>
        <div className='flex'> <p>Types:</p> <Abilities types={selectedUser?.data?.types} isLoaded={false}/></div>
        <Button endIcon={<SportsMmaOutlinedIcon/>} onClick={() => setIsFight(true)}>Lets fight</Button></Box>
}
