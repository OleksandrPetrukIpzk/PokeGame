import {ACHIEVEMENT} from "@/constants/achievement";
import {Dispatch} from "react";
import {AnyAction} from "redux";
import {addClick, addId} from "@/redux/features/achievements";
import {youHaveAchive} from "@/functions/pocemons";

export const addAchives = (key:  keyof typeof ACHIEVEMENT, count: number, dispatch: Dispatch<AnyAction>, ids: number[], text: string, functions: Function) =>{
    const index = ACHIEVEMENT[key].findIndex((item) => !ids.includes(item.id) && item.count > count);
    const id = ACHIEVEMENT[key][index].id;
    console.log(ACHIEVEMENT[key])
    if(index >= 0){
        dispatch(functions(count + 1))
        if(count + 1 === ACHIEVEMENT[key][index].count){
            console.log(ACHIEVEMENT[key])
            youHaveAchive(text +  Number(count + 1) + ' times')
            const updatedIds = [...ids, id]
            dispatch(addId(updatedIds))
             }
    }

}
