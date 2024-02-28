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
    return(<>

        <main className='main'>
            <Header/>
            <div className='flex justify-around flex-col items-center gap-5'>
            <Link href='/library'>
               <Button startIcon={<LibraryBooksOutlinedIcon/>}>Library Pokemons</Button>
            </Link>
            <Link href='/filter'>
                <Button startIcon={<FilterListOutlinedIcon/>}>Filter Pokemons</Button>
            </Link>
            <Link href='/store'>
                <Button startIcon={<LocalGroceryStoreOutlinedIcon/>}>Store Pokemons</Button>
            </Link>
            <Link href='/colections'>
                <Button startIcon={<CollectionsOutlinedIcon/>}>Your colection Pokemons</Button>
            </Link>
            <Link href='/arena'>
                <Button startIcon={<LanguageOutlinedIcon/>}>Online arena</Button>
            </Link>
            <Link href='/storyMode'>
                <Button startIcon={<StadiumOutlinedIcon/>}>Offline arena</Button>
            </Link>
                <Link href='/achievements'>
                    <Button startIcon={<WorkspacePremiumIcon/>}>Achievements</Button>
                </Link>
                <Link href='/achievements'>
                    <Button startIcon={<MilitaryTechIcon/>}>Top players</Button>
                </Link>
            </div>
        </main>
        </>)
}
