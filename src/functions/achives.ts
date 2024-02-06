import {ACHIEVEMENT} from "@/constants/achievement";
import {Dispatch} from "react";
import {AnyAction} from "redux";
import {addId} from "@/redux/features/achievements";
import {youHaveAchive} from "@/functions/pocemons";
import UserServices from "@/services/userServices";

export const addAchives = async (userId: string, key:  keyof typeof ACHIEVEMENT, count: number, dispatch: Dispatch<AnyAction>, ids: number[], text: string, functions: Function) =>{
    const index = ACHIEVEMENT[key].findIndex((item) => !ids.includes(item.id) && item.count > count);
    const id = ACHIEVEMENT[key][index].id;
    if(index >= 0){
        dispatch(functions(count + 1))
        if(count + 1 === ACHIEVEMENT[key][index].count){
            youHaveAchive(text +  Number(count + 1) + ' times')
            const updatedIds = [...ids, id]
            dispatch(addId(updatedIds))
            await UserServices.addAchiveById(userId, id)
             }
    }

}
