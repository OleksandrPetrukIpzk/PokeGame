import {CircularProgressWithLabel} from "./CircularProgressWithLabel"
import {Tooltip} from "@mui/material";
import {EMPTY_STRING, NUMBER_ZERO, WIN} from "@/constants/pokemons";
import {calculatePercent, minusElements} from "@/functions/logic";
import {isBiggest} from "@/functions/pocemons";
export const Achive = ({state, count, complete}: {state: number, count: number, complete: boolean}) =>{
    return(<div className='p-5'>
        {complete ? <div>
            <CircularProgressWithLabel value={100} type={WIN}/>
            <p className='text-center pt-1'>{count}</p>
        </div> :
            <Tooltip title={`You need ${minusElements(count, state)}`}>
            <div>
                <CircularProgressWithLabel value={isBiggest(state, NUMBER_ZERO) ? calculatePercent(state, count) : NUMBER_ZERO} type={EMPTY_STRING}/>
        <p className='text-center pt-1'>{count}</p>
            </div>
            </Tooltip>
        }
    </div>)
}
