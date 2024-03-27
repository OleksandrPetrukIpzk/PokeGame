import Link from "next/link";
import {COLOR_OF_ABILITIES} from "@/constants/pokemons";
import {TypesT} from "@/constants/types";

export const TypeLink = ({name}: TypesT) =>{
    return(
        <Link className='filter-element' style={{border: `4px solid ${COLOR_OF_ABILITIES[name]}`}} href={'/filter/'+name}>
            <p>{name}</p>
    </Link>)
}
