import {useAppSelector} from "@/redux/store";
import {PanelAchives} from "@/components/PanelAchives";
import {useTranslate} from "@tolgee/react";

export const Achives = () =>{
    const { t } = useTranslate();
    const click = useAppSelector(state => state.achiveReducer.value.click)
    const countOfWins= useAppSelector((state) => state.achiveReducer.value.countOfWins)
    const countOfLose = useAppSelector((state) => state.achiveReducer.value.countOfLose)
    const countOfPokemons = useAppSelector((state) => state.achiveReducer.value.countOfPokemons)
    const countOfStage = useAppSelector((state) => state.achiveReducer.value.countOfStage)
    const countOfLoseCoins = useAppSelector((state) => state.achiveReducer.value.countOfLoseCoins)
    const countOfRichCoins = useAppSelector((state) => state.achiveReducer.value.countOfRichCoins)


    return <>
        <PanelAchives state={click} index={0} text={t('Achive.click') + "👆"}/>
        <PanelAchives state={countOfWins} index={1} text={t('Achive.wins') +"🏆"}/>
        <PanelAchives state={countOfLose} index={2} text={t('Achive.lose') +"🚫"}/>
        <PanelAchives state={countOfPokemons} index={3} text={t('Achive.pokemons') +"📈"}/>
        <PanelAchives state={countOfStage} index={4} text={t('Achive.offline') +"👑"}/>
        <PanelAchives state={countOfLoseCoins} index={5} text={t('Achive.waste') +"💎"}/>
        <PanelAchives state={countOfRichCoins} index={6} text={t('Achive.rich') +"🤑💰"}/>
    </>
}
