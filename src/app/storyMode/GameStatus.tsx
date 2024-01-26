import {ifTheFight, ifYouWin} from "@/functions/logicPages";

export const GameStatus = ({gameStatus}: {gameStatus: string}) =>{
    return  (<div>
        <p>{ifTheFight(gameStatus)}</p>
        {gameStatus && <p>{ifYouWin(gameStatus)}</p>}
    </div>)
}
