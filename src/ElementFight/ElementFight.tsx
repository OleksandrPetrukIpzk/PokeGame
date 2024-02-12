import {Rang} from "@/constants/types";

export const ElementFight = ({item, user}: {item: Rang, user: string}) =>{
    return(<div className={`flex justify-around p-5`} style={{background: user === item.whoWin ? 'green' : 'red'}}>
        <p>{item.whoStart}</p>
        <p>VS</p>
        <p>{item.whoDefence}</p>
    </div>)

}
