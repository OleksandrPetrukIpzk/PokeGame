import axios from "axios";
import {DEFAULT_LINK, NUMBER_ONE, NUMBER_ZERO} from "@/constants/pokemons";
import {checkCurrentImage} from "@/functions/pocemons";
import {Dispatch, SetStateAction} from "react";
import {Ability, EvolutionT, PokemonDetailInfoT} from "@/constants/types";
export const searchEvolvedPokemons = (evolutionChain: any, level = 1, evolutionDatas: any) : any=>{
    if (!evolutionChain.evolves_to.length) {
        return evolutionDatas.push({
            pokemon: {
                ...evolutionChain.species,
                url: evolutionChain.species.url.replace(
                    "pokemon-species",
                    "pokemon"
                ),
            },
            level,
        });
    }
    evolutionDatas.push({
        pokemon: {
            ...evolutionChain.species,
            url: evolutionChain.species.url.replace("pokemon-species", "pokemon"),
        },
        level,
    });
    return searchEvolvedPokemons(
        evolutionChain.evolves_to[0],
        level + 1,
        evolutionDatas
    );
}
export const choicePokemon = async (setNextId: Dispatch<SetStateAction<string>>, setPrevId: Dispatch<SetStateAction<string>>, setPokemonInfo: Dispatch<SetStateAction<PokemonDetailInfoT>>, setTypes: Dispatch<SetStateAction<Ability[]>>, setIsError: Dispatch<SetStateAction<boolean>>, name: string, setEvolutionData: Dispatch<SetStateAction<EvolutionT[]>>) =>{
    const arr: EvolutionT[] = [];
  await axios.get(DEFAULT_LINK + 'pokemon/' + name).then(info => {
            setNextId((info.data.id + NUMBER_ONE).toString());
            if (info.data.id - NUMBER_ONE > NUMBER_ZERO) {
                setPrevId((info.data.id - NUMBER_ONE).toString());
            } else {
                setPrevId(info.data.id.toString());
            }
            setPokemonInfo({
                name: info.data.name,
                height: info.data.height,
                weight: info.data.weight,
                id: info.data.id,
                photoURL: checkCurrentImage(info.data.sprites),
                altPhotoURL: info.data.sprites.other.home.front_default,
                hp: info.data.stats[0].base_stat,
                attack: info.data.stats[1].base_stat,
                defense: info.data.stats[2].base_stat,
                specialAttack: info.data.stats[3].base_stat,
                specialDefense: info.data.stats[4].base_stat,
                speed: info.data.stats[5].base_stat,
                types: info.data.types,
            });
            setTypes(info.data.types);
      arr.push(info.data)
        }
    ).catch(() => setIsError(true));
    const {
        data: {
            evolution_chain: { url: evolutionURL },
        },
    } = await axios.get('https://pokeapi.co/api/v2/pokemon-species/'+ arr[0].id.toString());
    const { data: evolutionData } = await axios.get(evolutionURL);
    const evolvData: EvolutionT[] = [];
  searchEvolvedPokemons(evolutionData.chain, 1, evolvData);
  setEvolutionData(evolvData);
}
