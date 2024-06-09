import {Dispatch, SetStateAction, useEffect} from "react";
import axios from "axios";
import {DEFAULT_LINK, EMPTY_STRING, NUMBER_ONE} from "@/constants/pokemons";
import {FighterT} from "@/constants/types";
import {IconPokemon} from "@/components/iconPokemon";
import ReactLoading from 'react-loading';
import {useWindowSize} from "@/hooks/useWindowSize";
export const ThreeForThreeEnemyPokemon = ({setEnemyPokemons, idPokemon, enemyPokemons}: {setEnemyPokemons: Dispatch<SetStateAction<FighterT[]>>, idPokemon: number, enemyPokemons: FighterT[]}) => {
    const {isMobile} = useWindowSize();
    useEffect(() => {
        const randomPokemonId = Math.floor(Math.random() * 1000) + NUMBER_ONE;
        if(enemyPokemons[idPokemon - 1]?.name === EMPTY_STRING){
        axios.get(DEFAULT_LINK + 'pokemon/' + randomPokemonId).then((response) => {
            setEnemyPokemons((prev: FighterT[]) => {
               const pokemon = {
                    name: response.data.name,
                    sumaryAttack: response.data.stats[1].base_stat * response.data.stats[3].base_stat,
                    speed: response.data.stats[5]?.base_stat,
                    specialAttack: response.data.stats[3].base_stat,
                    sumaryHp: (response.data.stats[0].base_stat * response.data.stats[2].base_stat) * (response.data.stats[4].base_stat / 2),
                    specialDefence: response.data.stats[4].base_stat,
                    types: response.data.types,
                };
               return  prev.map((item: FighterT, id: number) =>
                    idPokemon - 1 === id ? { ...pokemon } : item
                )
            })
        })
        }
    }, [enemyPokemons]);
    return(
        <div className='text-center center-align'>
            {enemyPokemons[idPokemon - 1]?.name !== "" ?
            <div>
                <IconPokemon id={enemyPokemons[idPokemon - 1].name} size={isMobile ? 80 : 190}/>
                <p>{enemyPokemons[idPokemon - 1].name}</p>

            </div> :
                <div  style={{ width: '190px' }}>
                <ReactLoading type={'balls'} height={64} width={64} color={'black'} />
                </div>}
        </div>
    )
}
