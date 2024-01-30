import {CheckAchives} from "@/app/achievements/CheckAchives";
import {KEYS_ACHIEVEMENTS} from "@/constants/achievement";


export const PanelAchives = ({state, index, text}: {state: number, index: number, text: string}) =>{
    return(<div className='py-8'>
            <p className="text-center pb-4 font-medium text-lg">{text}</p>
            <CheckAchives state={state} achievementKey={KEYS_ACHIEVEMENTS[index]}/>
    </div>)

}
