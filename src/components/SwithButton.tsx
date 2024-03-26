import Link from "next/link";
import React from "react";
import {EMPTY_STRING} from "@/constants/pokemons";

export const SwitchButton = ({id, styles, text}: {id: string, styles: string, text: string}) =>{
    return   <Link href={EMPTY_STRING + id} className={styles}>
        <button className='swith-pokemon'>{text}</button>
    </Link>
}
