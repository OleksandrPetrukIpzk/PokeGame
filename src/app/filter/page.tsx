'use client'
import {Header} from "@/components/Header";
import '../globals.css'
import {useEffect, useState} from "react";
import Link from "next/link";
import {COLOR_OF_ABILITIES,} from "@/constants/pokemons";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {TypesT} from "@/constants/types";
import {getAllPokemonsTypes} from "@/functions/asyncFynctions";
import {TypeLink} from "@/components/TypeLink";
export default function Filter() {
    const [filter, setFilter] = useState<TypesT[]>([]);
    useEmptyAuth();
    useEffect(() => {
        getAllPokemonsTypes(setFilter);
    }, []);
    return(
        <div className='main'>
        <Header/>
            <main className='flex flex-wrap justify-center'>
                {filter.map(group => <TypeLink name={group.name}/>)}
            </main>
        </div>
    )
}
