import {Rang} from "@/constants/types";
import {isTheSame} from "@/functions/logic";

type ElementT = {
    item: Rang,
    user: string
}

export const ElementFight = ({item, user}: ElementT) =>{
    return(
        <div className={`flex justify-around p-5`} style={{background: isTheSame(user, item.whoWin)  ? 'green' : 'red'}}>
        <p>{item.whoStart}</p>
        <p>VS</p>
        <p>{item.whoDefence}</p>
    </div>)

}
