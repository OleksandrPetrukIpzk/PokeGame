import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useAppSelector} from "@/redux/store";
import {Modal} from "antd";
import {FighterT} from "@/constants/types";
import axios from "axios";
import {DEFAULT_LINK} from "@/constants/pokemons";
import {IconPokemon} from "@/components/iconPokemon";

export const ModalListPokemons = ({isModalPokemonOpen, hideModal, activeId, selectedPokemons, setSelectedPokemons}: {isModalPokemonOpen: boolean, hideModal: () => void, activeId: number, selectedPokemons:FighterT[], setSelectedPokemons: Dispatch<SetStateAction<FighterT[]>> }) => {


    const [arrIcons, setArrIcons] = useState<FighterT[]>([]);
    const arrPokemons = useAppSelector(state => state.authReducer.value.arrPokemons);

    useEffect(() => {
        if(arrIcons.length === 0){
        arrPokemons.map(
            (itemId) => {
                axios.get(DEFAULT_LINK + 'pokemon/' + itemId).then((response) => {
                    if(arrIcons.findIndex(item => item.name === response.data.name) === -1 && selectedPokemons.findIndex(item => item.name  === response.data.name) === -1) {
                        setArrIcons((prev) => {
                            prev.push({
                                name: response.data.name,
                                sumaryAttack: response.data.stats[1].base_stat * response.data.stats[3].base_stat,
                                speed: response.data.stats[5]?.base_stat,
                                specialAttack: response.data.stats[3].base_stat,
                                sumaryHp: (response.data.stats[0].base_stat * response.data.stats[2].base_stat) * (response.data.stats[4].base_stat / 2),
                                specialDefence: response.data.stats[4].base_stat,
                                types: response.data.types,
                            });
                            return prev;
                        })
                    }
                })
            }
        )
        }
    }, [selectedPokemons]);
    return(
        <Modal open={isModalPokemonOpen} onClose={hideModal}>
            <div className={'flex flex-wrap'}>
                {arrIcons.map((itemId) => {
                  return(
                    <div onClick={() =>
                    {
                        setArrIcons([]);
                        hideModal();
                        setSelectedPokemons((prev: FighterT[]) =>
                        prev.map((item: FighterT, id: number) =>
                            activeId - 1 === id ? { ...itemId } : item
                        )
                    )}}>
                    <IconPokemon id={itemId.name} size={100}/>
                        <p>{itemId.name}</p>
                    </div>)
                })}
            </div>
        </Modal>
    )
}
