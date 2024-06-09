import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {errorNotification} from "@/functions/pocemons";
import {DEFAULT_LINK, EMPTY_STRING} from "@/constants/pokemons";
import {Button, Input} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useTranslate} from "@tolgee/react";
export const Search = () =>{
    const {t} = useTranslate();
    const [text, setText] = useState(EMPTY_STRING);
    const router = useRouter();
    const searchPokemon = () =>{
        axios.get(DEFAULT_LINK + 'pokemon/' + text.toLowerCase()).then(() => router.push('/pokemon/' + text.toLowerCase())).catch(() =>{
            errorNotification(t('Notification.doesntInclude'));
        });
    }
    return(<div>
        <Input className='search-pokemon' placeholder={t('Header.placeHolder')} type='text' onChange={(e) => setText(e.target.value)}/>
        <Button variant='outlined' color='success' endIcon={<SearchIcon/>} onClick={() => searchPokemon()}>{t('Header.search')}</Button>
        </div>)
}
