"use client"
import React, {useState} from 'react'
import '../globals.css'
import Link from "next/link";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {useRouter} from "next/navigation";
import {EMPTY_STRING} from "@/constants/pokemons";
import {useAuth} from "@/hooks/useAuth";
import {InputsContainer} from "@/components/InputsContainer";
import Button from "@mui/joy/Button";
import Cookies from 'js-cookie';
import {useTranslate} from "@tolgee/react";
import {tolgee} from "@/app/layout";
import {clickLogin} from "@/functions/asyncFynctions";
import {isTheSame} from "@/functions/logic";
import {useWindowSize} from "@/hooks/useWindowSize";
export default function Login () {
    const {t} = useTranslate();
    const [email, setEmail] = useState(EMPTY_STRING);
    const [password, setPassword] = useState(EMPTY_STRING);
    const [name, setName] = useState(EMPTY_STRING);
    const dispatch = useDispatch<AppDispatch>();
    const [errors, setErrors] = useState<string[]>([]);
    const [errorFromBack, setErrorFromBack] = useState('');
    const {isMobile} = useWindowSize();
    const router = useRouter();
    const changeLang = (value: string) => {
        Cookies.set('lang', value);
        tolgee.changeLanguage(value);
    }
    useAuth('menu', 'login');
    return(
        <main  className={!isMobile && 'h-screen flex justify-stretch items-stretch'}>
            {isMobile ?
                <>
                    <div className='flex flex-col items-center w-screen justify-center '>
                        <p className=' font-sans text-lg mb-4 font-medium'>{t('Login.login')}</p>
                        <InputsContainer setErrors={setErrors} email={email} name={name} setEmail={setEmail}
                                         setName={setName} password={password} setPassword={setPassword}/>
                        <Button onClick={() => clickLogin(name, email, password, dispatch, router, setErrorFromBack)}
                                size="lg" color="success" variant="solid"
                                disabled={!isTheSame(errors.length, 0) || isTheSame(name.length, 0) || isTheSame(password.length, 0)}>{t('Login.loginButton')}</Button>
                        {errorFromBack.length > 0 && <p className='mt-2 mb-1 text-red-800'>{errorFromBack}</p>}
                        <span className=' font-sans text-lg mt-4 font-medium'>
                            {t('Login.youDontHave')}
                            <Link className='font-light text-cyan-800 underline '
                                  href='/registration'>  {t('Login.sign')}</Link>
                        </span>
                    </div>
                    <div className={'flex items-center justify-center'}>
                        <Button variant={tolgee.getLanguage() === 'ua' ? 'solid' : 'outlined'} size="lg"
                                onClick={() => changeLang('ua')}>🇺🇦</Button>
                        <Button variant={tolgee.getLanguage() === 'en' ? 'solid' : 'outlined'} size="lg"
                                onClick={() => changeLang('en')}>🇺🇸</Button>
                    </div>
                </>
                :
                <>
                    <div
                        className='bg-sky-300 text-center flex flex-col items-center place-items-center place-content-center px-40'>
                        <p className='mb-10 font-sans text-2xl font-bold italic '>PokeGame.com</p>
                        <p className='text-lg font-sans '>PokeGame.com {t('Login.description')}</p>
                        <div>
                            <Button variant={tolgee.getLanguage() === 'ua' ? 'solid' : 'outlined'} size="lg"
                                    onClick={() => changeLang('ua')}>🇺🇦</Button>
                            <Button variant={tolgee.getLanguage() === 'en' ? 'solid' : 'outlined'} size="lg"
                                    onClick={() => changeLang('en')}>🇺🇸</Button>
                        </div>
                    </div>
                    <div className='flex flex-col items-center w-screen justify-center '>
                        <p className=' font-sans text-lg mb-4 font-medium'>{t('Login.login')}</p>
                        <InputsContainer setErrors={setErrors} email={email} name={name} setEmail={setEmail}
                                         setName={setName} password={password} setPassword={setPassword}/>
                        <Button onClick={() => clickLogin(name, email, password, dispatch, router, setErrorFromBack)}
                                size="lg" color="success" variant="solid"
                                disabled={!isTheSame(errors.length, 0) || isTheSame(name.length, 0) || isTheSame(password.length, 0)}>{t('Login.loginButton')}</Button>
                        {errorFromBack.length > 0 && <p className='mt-2 mb-1 text-red-800'>{errorFromBack}</p>}
                        <span className=' font-sans text-lg mt-4 font-medium'>
                            {t('Login.youDontHave')}
                            <Link className='font-light text-cyan-800 underline '
                                  href='/registration'>  {t('Login.sign')}</Link>
                        </span>
                    </div>
                </>}

        </main>
    )
}
