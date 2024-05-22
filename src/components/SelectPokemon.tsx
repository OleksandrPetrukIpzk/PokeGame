import {IconPokemon} from "@/components/iconPokemon";
import Button from "@mui/joy/Button";
import {useTranslate} from "@tolgee/react";
import {FighterT} from "@/constants/types";
import {useWindowSize} from "@/hooks/useWindowSize";

export const SelectPokemon = ({showModal, activeId, selectedPokemons}: {showModal: Function, activeId: number, selectedPokemons: FighterT[]}) => {
    const {t} = useTranslate();
    const {isMobile} = useWindowSize();
return(
    <div>
        <div className={'flex items-center justify-center '}>
            {selectedPokemons[activeId - 1]?.name ?
                <div className={'w-40 flex gap-1 mb-2 flex-col items-center justify-center'}>
                <IconPokemon id={selectedPokemons[activeId - 1]?.name} size={isMobile ? 80 : 190}/>
                <p>{selectedPokemons[activeId - 1].name}</p>
                </div>:
                <p className={'pt-20 pb-20 mb-2 border w-40 text-center '}>+</p> }
        </div>
        <Button onClick={() => showModal(activeId)}>{t('Profile.pokemons')}</Button>

    </div>
)
}
