import {ifTheFight, ifYouWin} from "@/functions/logicPages";
import {useTranslate} from "@tolgee/react";

type GameStatusT = {
    gameStatus: string
}

export const GameStatus = ({gameStatus}: GameStatusT) =>{
    const {t} = useTranslate();
    return  (<div className='text-center text-xl font-medium text-red-600'>
        <p className=' text-center text-xl font-medium text-red-600'>{ifTheFight(gameStatus)}</p>
        {gameStatus && <p className=' text-center text-xl font-medium text-red-600'>{ifYouWin(gameStatus, t)}</p>}
    </div>)
}
