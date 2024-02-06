import {STYLES_FOR_MODAL} from "@/constants/pokemons";
import {IconPokemon} from "@/IconPokemon/iconPokemon";
import {Abilities} from "@/app/pokemon/[name]/abilities";
import {Box, Button} from "@mui/material";
import SportsMmaOutlinedIcon from "@mui/icons-material/SportsMmaOutlined";
import {OnlineFighters} from "@/constants/types";
import {Dispatch, SetStateAction} from "react";

export const EnemyPanel = ({selectedUser, setIsFight}: {selectedUser: OnlineFighters, setIsFight: Dispatch<SetStateAction<boolean>>}) =>{
    return <Box sx={{ ...STYLES_FOR_MODAL, width: 400 }}>
        <div className='flex justify-between items-center mb-5'>
            <IconPokemon id={selectedUser?.data?.name}/>
            <div className='flex flex-col'>
                <p>Name: {selectedUser.data.name}</p>
                <p>Types:</p>
                <Abilities types={selectedUser?.data?.types} isLoaded={false}/>
                <Button variant="contained" color="error" endIcon={<SportsMmaOutlinedIcon/>} onClick={() => setIsFight(true)}>Lets fight</Button>
            </div>
        </div>
       </Box>
}
