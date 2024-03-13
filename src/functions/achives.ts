import {ACHIEVEMENT, COUNT_ACHIVES} from "@/constants/achievement";
import {Dispatch} from "react";
import {AnyAction} from "redux";
import {addId} from "@/redux/features/achievements";
import {youHaveAchive} from "@/functions/pocemons";
import UserServices from "@/services/userServices";
import {useTranslate} from "@tolgee/react";

export const addAchives = async (userId: string, key:  keyof typeof ACHIEVEMENT, count: number, dispatch: Dispatch<AnyAction>, ids: number[], text: string, functions: Function) =>{
    const {t} = useTranslate()
    const index = ACHIEVEMENT[key].findIndex((item) => !ids.includes(item.id) && item.count > count);
    if(index >= 0){
        const id = ACHIEVEMENT[key][index].id;
        dispatch(functions(count + 1))
        if(count + 1 === ACHIEVEMENT[key][index].count){
            youHaveAchive(text +  Number(count + 1) + t('Notification.times'))
            const updatedIds = [...ids, id]
            dispatch(addId(updatedIds))
            await UserServices.addAchiveById(userId, id)
             }
    }

}

export const achivePercent = (achiveList: number) =>{
    return (achiveList * 100) / COUNT_ACHIVES
}
