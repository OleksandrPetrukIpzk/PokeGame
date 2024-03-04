'use client'
import {Header} from "@/Header/Header";
import Link from "next/link";
import {Button} from "@mui/material";
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import StadiumOutlinedIcon from '@mui/icons-material/StadiumOutlined';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import '../globals.css'
import {useAuth} from "@/hooks/useAuth";
export default function Menu (){
    useAuth('menu', 'login')
    return(<main className='main'>
            <Header/>
            <div className='flex justify-around flex-col items-center gap-5'>
                <Button variant='contained' aria-label='Library of pokemons' href='/library' startIcon={<LibraryBooksOutlinedIcon/>}>Library Pokemons</Button>
                <Button variant='contained' aria-label='Library of filtered pokemons' href='/filter' startIcon={<FilterListOutlinedIcon/>}>Filter Pokemons</Button>
                <Button variant='contained' aria-label='Store of pokemons' href='/store' startIcon={<LocalGroceryStoreOutlinedIcon/>}>Store Pokemons</Button>
                <Button variant='contained' aria-label='Your colection of pokemons' href='/colections' startIcon={<CollectionsOutlinedIcon/>}>Your colection Pokemons</Button>
                <Button variant='contained' aria-label='Arena' href='/arena' startIcon={<LanguageOutlinedIcon/>}>Online arena</Button>
                <Button variant='contained' aria-label='Offline arena' href='/storyMode' startIcon={<StadiumOutlinedIcon/>}>Offline arena</Button>
                <Button variant='contained' aria-label='Library of pokemons' href='/achievements' startIcon={<WorkspacePremiumIcon/>}>Achievements</Button>
                <Button variant='contained' aria-label='Top players in simulator' href='/bestPlayers' startIcon={<MilitaryTechIcon/>}>Top players</Button>
            </div>
        </main>)
}
