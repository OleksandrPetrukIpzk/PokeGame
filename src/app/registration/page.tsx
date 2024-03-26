"use client"
import React, {useState} from 'react'
import '../globals.css'
import Link from "next/link";
import AuthServices from "@/services/authServices";
import {logIn} from "@/redux/features/auth-slice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {useAuth} from "@/hooks/useAuth";
import {EMPTY_STRING, NAME_OF_TOKEN} from "@/constants/pokemons";
import {errorNotification} from "@/functions/pocemons";
import {validateEmail} from "@/functions/auth";
import {InputsContainer} from "@/components/InputsContainer";
import Button from "@mui/joy/Button";
import Cookies from "js-cookie";
import {useTranslate} from "@tolgee/react";
import {tolgee} from "@/app/layout";
export default function Registration () {
    const {t} = useTranslate();
    const [email, setEmail] = useState(EMPTY_STRING);
    const [password, setPassword] = useState(EMPTY_STRING);
    const [name, setName] = useState(EMPTY_STRING);
    const [errors, setErrors] = useState<string[]>([]);
    const [errorFromBack, setErrorFromBack] = useState('');
    const router = useRouter()
    const dispatch = useDispatch();
    const  clickRegistration = async () => {
        try {
            const response = await AuthServices.create(name, email, password);
            dispatch(logIn({
                id: response.data.user._id,
                name: response.data.user.name,
                email: response.data.user.email,
                password: response.data.user.password,
                img: response.data.user.img,
                selectedPokemon: response.data.user.selectedPokemon,
                coins: response.data.user.coins,
                rang: response.data.user.rang,
                stageInOfflineArena: response.data.user.stageInOfflineArena,
                arrPokemons: response.data.user.arrPokemons,
                arrAchives: response.data.user.arrAchives,
                arrPotions: response.data.user.arrPotions,
            }));
            Cookies.set(NAME_OF_TOKEN, response.data.access_token)
            router.push('/introduction')
        } catch (e: any) {
            setErrorFromBack(e.response.data.error);
        }
    }
    const changeLang = (value: string) => {
        Cookies.set('lang', value);
        tolgee.changeLanguage(value);
    }
    return(
        <main  className='h-screen flex justify-stretch items-stretch'>
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
                <p className=' font-sans text-lg mb-4 font-medium'> {t('Register.info')}</p>
                <InputsContainer setErrors={setErrors} email={email} name={name} setEmail={setEmail} setName={setName}
                                 password={password} setPassword={setPassword}/>
                <Button onClick={() => clickRegistration()}   size="lg" color="success" variant="solid" disabled={errors.length !== 0 || name.length === 0}> {t('Register.button')}</Button>
                {errorFromBack.length > 0 && <p className='mt-2 mb-1 text-red-800'>{errorFromBack}</p>}
                <span className=' font-sans text-lg mt-4 font-medium'>
               {t('Register.have')}
               <Link className='font-light text-cyan-800 underline ' href='/login'>{t('Register.login')}</Link>
            </span>
            </div>
        </main>
    )
}
