import {CircularProgressWithLabel} from "./CircularProgressWithLabel"
import {Tooltip} from "@mui/material";
export const Achive = ({state, count, complete}: {state: number, count: number, complete: boolean}) =>{
    return(<div className='p-5'>
        {complete ? <div>
            <CircularProgressWithLabel value={100}/>
            <p className='text-center pt-1'>{count}</p>
        </div> :

            <Tooltip title={`You need ${count - state}`}>
            <div>
                <CircularProgressWithLabel value={state > 0 ? (state / count) * 100 : 0}/>
        <p className='text-center pt-1'>{count}</p>
            </div>
            </Tooltip>
        }
    </div>)
}
