import {ifTheFight, ifYouWin} from "@/functions/logicPages";

export const GameStatus = ({gameStatus}: {gameStatus: string}) =>{
    return  (<div className='text-center text-white text-xl font-medium text-red-600'>
        <p className=' text-center text-white text-xl font-medium text-red-600'>{ifTheFight(gameStatus)}</p>
        {gameStatus && <p className=' text-center text-white text-xl font-medium text-red-600'>{ifYouWin(gameStatus)}</p>}
    </div>)
}
