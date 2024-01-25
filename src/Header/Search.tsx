import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {errorNotification} from "@/functions/pocemons";
import {DEFAULT_LINK, EMPTY_STRING} from "@/constants/pokemons";
import {Button, Input} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
export const Search = () =>{
    const [text, setText] = useState(EMPTY_STRING);
    const router = useRouter();
    const searchPokemon = () =>{
        axios.get(DEFAULT_LINK + 'pokemon/' + text).then(() => router.push('/pokemon/' + text)).catch(() =>{
            errorNotification('Pokemon does not exist');
        });
    }
    return(<div>
        <Input className='search-pokemon' placeholder='I want find...' type='text' onChange={(e) => setText(e.target.value)}/>
        <Button variant='outlined' color='success' endIcon={<SearchIcon/>} onClick={() => searchPokemon()}>Search</Button>
        </div>)
}
