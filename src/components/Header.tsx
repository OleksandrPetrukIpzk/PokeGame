import Link from "next/link";
import {Search} from "@/components/Search";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAppSelector} from "@/redux/store";
import {logout} from "@/functions/auth";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {Button,} from "@mui/material";
import {useTranslate} from "@tolgee/react";
import {useWindowSize} from "@/hooks/useWindowSize";
import Image from "next/image";
import {useRef, useState} from "react";
import {FaBars, FaTimes} from "react-icons/fa";


export const Header = () =>{
    const {t} = useTranslate();
    const {name, coins, img} =  useAppSelector((state) => state.authReducer.value);
    const navRef = useRef();
    const {isMobile} = useWindowSize();
    const dispatch = useDispatch();
    const router = useRouter();
    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };
    return(
        <header className='flex justify-between ml-10 mr-10 items-center'>
            <p className='stats pt-2 header-text'>PokeGame</p>

            {isMobile ? <>
                    <div className='flex gap-3'>
                        <Image src={img} alt={name} width={40} height={40}/>
                        <div className=' flex flex-col gap-2'>
                            <p>{name}</p>
                            <div className=' flex items-center '>
                                <Image
                                    src={"https://static.vecteezy.com/system/resources/thumbnails/022/030/468/small/3d-coin-dollar-gold-png.png"}
                                    alt={'image coin'} width={10} height={10}/>
                                <p>{coins}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <nav ref={navRef}>
                            <Search/>
                            <Link className='nav-link' href='/menu'>{t('Header.menu')}</Link>
                            <Link className='nav-link' href='/cabinet/my'>{t('Header.profile')}</Link>
                            <Button  color='error' onClick={() => logout(dispatch, router)}>{t('Header.logout')}</Button>
                            <button
                                className="nav-btn nav-close-btn"
                                onClick={showNavbar}>
                                <FaTimes/>
                            </button>
                        </nav>
                        <button
                            className="nav-btn"
                            onClick={showNavbar}>
                            <FaBars/>
                        </button>
                    </div>
                </> :
                <>
                    <Search/>
                    <Link className='nav-link' href='/menu'>{t('Header.menu')}</Link>
                    <Link className='nav-link' href='/cabinet/my'>{t('Header.profile')}</Link>
                    <div className='flex gap-3'>
                        <Image src={img} alt={name} width={70} height={70}/>
                        <div className=' flex flex-col gap-2'>
                            <p>{name}</p>
                            <div className=' flex items-center '>
                                <Image
                                    src={"https://static.vecteezy.com/system/resources/thumbnails/022/030/468/small/3d-coin-dollar-gold-png.png"} alt={'image coin'} width={30} height={30} />
                <p>{coins}</p>
            </div>
        </div>
    </div>
    <Button  color='error' onClick={() => logout(dispatch, router)}>{t('Header.logout')}</Button>
                </>
            }

            <ToastContainer/>
        </header>
    )
}
