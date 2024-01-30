import {useAppSelector} from "@/redux/store";
import {PanelAchives} from "@/app/achievements/PanelAchives";

export const Achives = () =>{
    const click = useAppSelector(state => state.achiveReducer.value.click)
    const countOfWins= useAppSelector((state) => state.achiveReducer.value.countOfWins)
    const countOfLose = useAppSelector((state) => state.achiveReducer.value.countOfLose)
    const countOfPokemons = useAppSelector((state) => state.achiveReducer.value.countOfPokemons)
    const countOfStage = useAppSelector((state) => state.achiveReducer.value.countOfStage)
    const countOfLoseCoins = useAppSelector((state) => state.achiveReducer.value.countOfLoseCoins)
    const countOfRichCoins = useAppSelector((state) => state.achiveReducer.value.countOfRichCoins)


    return <>
        <PanelAchives state={click} index={0} text={"Count of clicks 👆"}/>
        <PanelAchives state={countOfWins} index={1} text={"Count of wins 🏆"}/>
        <PanelAchives state={countOfLose} index={2} text={"Count of lose 🚫"}/>
        <PanelAchives state={countOfPokemons} index={3} text={"Count of pokemons 📈"}/>
        <PanelAchives state={countOfStage} index={4} text={"Count on offline arena 👑"}/>
        <PanelAchives state={countOfLoseCoins} index={5} text={"Count of lose coins 💎"}/>
        <PanelAchives state={countOfRichCoins} index={6} text={"Count of rich coins 🤑💰"}/>
    </>
}
