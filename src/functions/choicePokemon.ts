import axios from "axios";
import {DEFAULT_LINK, NUMBER_ONE, NUMBER_ZERO} from "@/constants/pokemons";
import {checkCurrentImage} from "@/functions/pocemons";
import {Dispatch, SetStateAction} from "react";

export const choicePokemon = (setNextId: Dispatch<SetStateAction<string>>, setPrevId: Dispatch<SetStateAction<string>>, setPokemonInfo: Dispatch<SetStateAction<any>>, setTypes: Dispatch<SetStateAction<any>>, setIsError: Dispatch<SetStateAction<boolean>>, name: string) =>{
    axios.get(DEFAULT_LINK + 'pokemon/' + name).then(info => {
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
        }
    ).catch(() => setIsError(true));
}
