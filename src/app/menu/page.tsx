'use client'
import {Header} from "@/components/Header";
import {Button} from "@mui/material";
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import StadiumOutlinedIcon from '@mui/icons-material/StadiumOutlined';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import {useAuth} from "@/hooks/useAuth";
import {useTranslate} from "@tolgee/react";
import '../globals.css'
export default function Menu (){
    const {t} = useTranslate();
    useAuth('menu', 'login');
    return(<main className='main'>
            <Header/>
            <div className='flex justify-around flex-col items-center gap-5'>
                <Button variant='contained' aria-label='Library of pokemons' href='/library' startIcon={<LibraryBooksOutlinedIcon/>}>{t('Menu.Library')}</Button>
                <Button variant='contained' aria-label='Library of filtered pokemons' href='/filter' startIcon={<FilterListOutlinedIcon/>}>{t('Menu.Filter')}</Button>
                <Button variant='contained' aria-label='Store of pokemons' href='/store' startIcon={<LocalGroceryStoreOutlinedIcon/>}>{t('Menu.Store')}</Button>
                <Button variant='contained' aria-label='Your colection of pokemons' href='/colections' startIcon={<CollectionsOutlinedIcon/>}>{t('Menu.Collection')}</Button>
                <Button variant='contained' aria-label='Arena' href='/arena' startIcon={<LanguageOutlinedIcon/>}>{t('Menu.Online')}</Button>
                <Button variant='contained' aria-label='Offline arena' href='/storyMode' startIcon={<StadiumOutlinedIcon/>}>{t('Menu.Offline')}</Button>
                <Button variant='contained' aria-label='Library of pokemons' href='/achievements' startIcon={<WorkspacePremiumIcon/>}>{t('Menu.Achive')}</Button>
                <Button variant='contained' aria-label='Top players in simulator' href='/bestPlayers' startIcon={<MilitaryTechIcon/>}>{t('Menu.Top')}</Button>
            </div>
        </main>)
}
