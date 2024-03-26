import {CheckAchives} from "@/components/CheckAchives";
import {KEYS_ACHIEVEMENTS} from "@/constants/achievement";

type PanelAchivesT = {
    state: number,
    index: number,
    text: string
}

export const PanelAchives = ({state, index, text}: PanelAchivesT) =>{
    return(<div className='py-8'>
            <p className="text-center pb-4 font-medium text-lg">{text}</p>
            <CheckAchives state={state} achievementKey={KEYS_ACHIEVEMENTS[index]}/>
    </div>)

}
