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
import '../globals.css'
import {useAuth} from "@/hooks/useAuth";
export default function Menu (){
    useAuth('menu', 'login')
    return(<>

        <main className='main'>
            <Header/>
            <div className='flex justify-around'>
            <Link href='/library'>
               <Button endIcon={<LibraryBooksOutlinedIcon/>}>Library Pokemons</Button>
            </Link>
            <Link href='/filter'>
                <Button endIcon={<FilterListOutlinedIcon/>}>Filter Pokemons</Button>
            </Link>
            <Link href='/store'>
                <Button endIcon={<LocalGroceryStoreOutlinedIcon/>}>Store Pokemons</Button>
            </Link>
            <Link href='/colections'>
                <Button endIcon={<CollectionsOutlinedIcon/>}>Your colection Pokemons</Button>
            </Link>
            <Link href='/arena'>
                <Button endIcon={<LanguageOutlinedIcon/>}>Online arena</Button>
            </Link>
            <Link href='/storyMode'>
                <Button endIcon={<StadiumOutlinedIcon/>}>Offline arena</Button>
            </Link>
                <Link href='/achievements'>
                    <Button endIcon={<WorkspacePremiumIcon/>}>Achievements</Button>
                </Link>
            </div>
        </main>
        </>)
}
