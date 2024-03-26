import {useAppSelector} from "@/redux/store";
import {PanelAchives} from "@/components/PanelAchives";
import {useTranslate} from "@tolgee/react";

export const Achives = () =>{
    const { t } = useTranslate();
    const { click, countOfWins, countOfLose, countOfPokemons, countOfStage, countOfLoseCoins, countOfRichCoins } = useAppSelector(state => state.achiveReducer.value);

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
