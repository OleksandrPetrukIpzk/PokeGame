import {Button} from "@mui/material";
import SportsMmaOutlinedIcon from "@mui/icons-material/SportsMmaOutlined";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

export const ButtonsForFight = ({gameStatus, sendResult, handleLeave, hitPokemon}: {gameStatus: string, sendResult: Function, handleLeave: Function, hitPokemon: Function}) =>{
    const leave = () =>{
     handleLeave();
    }
    const hit = () =>{
        hitPokemon();
    }
    const send = async () => {
        sendResult()
    }
    return  (<div>
        {!gameStatus && <Button className='button_margin' variant="contained" endIcon={<SportsMmaOutlinedIcon/>} onClick={hit}>Hit</Button>}
        {!gameStatus && <Button variant="contained" endIcon={<DirectionsRunIcon/>} onClick={leave}>Leave</Button>}
        {gameStatus && <Button variant="contained" endIcon={<AssignmentTurnedInIcon/>} onClick={send}>Finish game</Button>}
    </div>)
}
