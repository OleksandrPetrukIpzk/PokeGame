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
import Image from "next/image";
export default function Menu (){
    const {t} = useTranslate();
    useAuth('menu', 'login');
    return(<main className='main'>
            <Header/>
        <div className='flex justify-center items-center gap-5 pl-5 pr-5 flex-wrap'>
            <div className='p-1 border-2 rounded-lg border-black gap-1 flex flex-col w-30 h-72'>
                <Image src={'https://i.pinimg.com/originals/97/3e/ae/973eae0b4824c1317d22061cbce36f56.jpg'} alt={'text'}
                       width={300} height={300}/>
                <Button variant='contained' aria-label='Library of pokemons' href='/library'
                        startIcon={<LibraryBooksOutlinedIcon/>}>{t('Menu.Library')}</Button>
            </div>
            <div className='p-1 border-2 rounded-lg border-black gap-1 flex justify-between flex-col w-30 h-72'>
                <Image
                    src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm0Hu7Yco88ghuWZ5MkDOEKImvhA1cuImLLETLRyujrg&s'}
                    alt={'text'}
                    width={300} height={300}/>
                <Button variant='contained' aria-label='Library of filtered pokemons' href='/filter'
                        startIcon={<FilterListOutlinedIcon/>}>{t('Menu.Filter')}</Button>
            </div>
            <div className='p-1 border-2 rounded-lg border-black gap-1 justify-between flex flex-col w-30 h-72'>
                <Image
                    src={'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/02/Pokemon-Legends-Arceus-General-Store-Full-Upgrade.jpg'}
                    alt={'text'}
                    width={300} height={300}/>
                <Button variant='contained' aria-label='Store of pokemons' href='/store'
                        startIcon={<LocalGroceryStoreOutlinedIcon/>}>{t('Menu.Store')}</Button>
            </div>
            <div className='p-1 border-2 rounded-lg border-black justify-between gap-1 flex flex-col w-30 h-72'>
                <Image
                    src={'https://lh3.googleusercontent.com/proxy/gnXQQ9Ojs5JcMHswDLdGzri-ZhiNvDQEjX2QilccxSXZNtaeFXShiD8M_WGD0cOd7bkF9ZxqrewRlESQiodC6IdIDifCqSwhwkKOp88VhcOwEwfgzhr4pYrjRA'}
                    alt={'text'}
                    width={300} height={300}/>
                <Button variant='contained' aria-label='Your colection of pokemons' href='/colections'
                        startIcon={<CollectionsOutlinedIcon/>}>{t('Menu.Collection')}</Button>
            </div>
            <div className='p-1 border-2 rounded-lg border-black justify-between gap-1 flex flex-col w-30 h-72'>
                <Image
                    src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcBAvdmtcpPzUYYaNJFzg5DeC5oaHwBjrWn4zok6TieQ&s'}
                    alt={'text'}
                    width={300} height={300}/>
                <Button variant='contained' aria-label='Arena' href='/arena'
                        startIcon={<LanguageOutlinedIcon/>}>{t('Menu.Online')}</Button>
            </div>
            <div className='p-1 border-2 rounded-lg border-black justify-between gap-1 flex flex-col w-30 h-72'>
                <Image
                    src={'https://preview.redd.it/battle-arena-pokemon-v0-eyepg8yrbxna1.jpg?width=640&crop=smart&auto=webp&s=f1a06927bce5f670c84c572e02e74477091054b7'}
                    alt={'text'}
                    width={300} height={300}/>
                <Button variant='contained' aria-label='Offline arena' href='/storyMode'
                        startIcon={<StadiumOutlinedIcon/>}>{t('Menu.Offline')}</Button>
            </div>
            <div className='p-1 border-2 rounded-lg border-black justify-between gap-1 flex flex-col w-30 h-72'>
                <Image
                    src={'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/05/pokemon-ash-ketchum-champion-trophy.jpg'}
                    alt={'text'}
                    width={300} height={300}/>
                <Button variant='contained' aria-label='Achives' href='/achievements'
                        startIcon={<WorkspacePremiumIcon/>}>{t('Menu.Achive')}</Button>
            </div>
            <div className='p-1 border-2 rounded-lg border-black justify-between gap-1 flex flex-col w-30 h-72'>
                <Image
                    src={'https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-go/6/64/Teamsss.jpg'}
                    alt={'text'}
                    width={300} height={300}/>
                <Button variant='contained' aria-label='Top players in simulator' href='/bestPlayers'
                        startIcon={<MilitaryTechIcon/>}>{t('Menu.Top')}</Button>
            </div>
            <div className='p-1 border-2 rounded-lg border-black justify-between gap-1 flex flex-col w-30 h-72'>
                <Image
                    src={'https://i.pinimg.com/originals/5c/6b/cf/5c6bcfe3e9ccac61e559256445cf56c6.png'}
                    alt={'text'}
                    width={300} height={300}/>
                <Button variant='contained' aria-label='Offline arena' href='/threeForThree'
                        startIcon={<StadiumOutlinedIcon/>}>{t('Menu.Offline')}</Button>
            </div>
            </div>
    </main>
)
}
