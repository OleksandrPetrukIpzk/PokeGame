import {useAppSelector} from "@/redux/store";
import {ACHIEVEMENT} from "@/constants/achievement";
import {Achive} from "@/components/Achive";

type CheckT = {
    state: number,
    achievementKey : keyof typeof ACHIEVEMENT
}

export const CheckAchives = ({state, achievementKey }: CheckT) =>{
    const ids  = useAppSelector((state) => state.achiveReducer.value.ids)
    return(<div className='flex justify-around flex-wrap'>
        {ACHIEVEMENT[achievementKey]?.map(element =>
            ids.includes(element.id) ?
            <Achive state={state} count={element.count} complete={true}/> : <Achive state={state} count={element.count} complete={false}/>)}
    </div>)
}
