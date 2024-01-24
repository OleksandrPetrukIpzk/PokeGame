'use client'
import {Header} from "@/Header/Header";
import '../globals.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import {COLOR_OF_ABILITIES, DEFAULT_LINK, EMPTY_STRING} from "@/constants/pokemons";
import {errorNotification} from "@/functions/pocemons";
import {getAuth} from "@/functions/auth";
import {useDispatch} from "react-redux";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
export default function Filter() {
    const [filter, setFilter] = useState([{name:EMPTY_STRING, url: EMPTY_STRING}]);
    useEmptyAuth();
    useEffect(() => {
    axios.get(DEFAULT_LINK +'type').then(data => setFilter(data.data.results)).catch(() => errorNotification);
    }, []);
    return(
        <div className='main'>
        <Header/>
            <main className='flex flex-wrap justify-center'>
                {filter.map(group =><Link className='filter-element' style={{border: `4px solid ${COLOR_OF_ABILITIES[group.name]}`}} href={'/filter/'+group.name}><p>{group.name}</p></Link>)}
            </main>
        </div>
    )
}