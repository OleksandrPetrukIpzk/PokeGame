import {useAppSelector} from "@/redux/store";
import {ACHIEVEMENT} from "@/constants/achievement";
import {Achive} from "@/app/achievements/Achive";
export const CheckAchives = ({state, achievementKey }: {state: number, achievementKey : keyof typeof ACHIEVEMENT}) =>{
    const ids  = useAppSelector((state) => state.achiveReducer.value.ids)
    return(<div className='flex justify-around flex-wrap'>
        {ACHIEVEMENT[achievementKey]?.map(element =>
            ids.includes(element.id) ?
            <Achive state={state} count={element.count} complete={true}/> : <Achive state={state} count={element.count} complete={false}/>)}
    </div>)
}
