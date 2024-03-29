"use client"
import React, {useEffect, useState} from 'react'
import '../globals.css'
import Link from "next/link";
import AuthServices from "@/services/authServices";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {logIn} from "@/redux/features/auth-slice";
import {useRouter} from "next/navigation";
import {EMPTY_STRING, NAME_OF_TOKEN} from "@/constants/pokemons";
import {useAuth} from "@/hooks/useAuth";
import {InputsContainer} from "@/app/login/InputsContainer";
import Button from "@mui/joy/Button";
import Cookies from 'js-cookie';
import {configureAchives} from "@/functions/auth";
export default function Login () {
    const [email, setEmail] = useState(EMPTY_STRING);
    const [password, setPassword] = useState(EMPTY_STRING);
    const [name, setName] = useState(EMPTY_STRING);
    const dispatch = useDispatch<AppDispatch>();
    const [errors, setErrors] = useState<string[]>([]);
    const [errorFromBack, setErrorFromBack] = useState('');
    const router = useRouter();
    const  clickLogin = async () =>{
        try {
                const response = await AuthServices.logIn(name, email, password);
                Cookies.set(NAME_OF_TOKEN, response.data.access_token);
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
               await configureAchives(response.data.user.arrAchives, dispatch);
                router.push('/menu')
        } catch (e: any) {
           setErrorFromBack(e.response.data.error);
        }
    }
    const changeEmail = (value:string) =>{
        setEmail(value);
    }
    const changePassword = (value:string) =>{
        setPassword(value);
    }

    const changeName = (value:string) =>{
        setName(value);
    }

    useAuth('menu', 'login');

    return(
        <main  className='h-screen flex justify-stretch items-stretch'>
            <div className='bg-sky-300 text-center flex flex-col items-center place-items-center place-content-center px-40'>
                <p className='mb-10 font-sans text-2xl font-bold italic '>PokeGame.com</p>
                <p className='text-lg font-sans '>PokeGame.com is the best place to enjoy a good game.</p>
            </div>
                <div className='flex flex-col items-center w-screen justify-center '>
                 <p className=' font-sans text-lg mb-4 font-medium' >Login an your account</p>
                <InputsContainer setErrors={setErrors} email={email} name={name} setEmail={setEmail} setName={setName} password={password} setPassword={setPassword}/>
                    <Button onClick={() => clickLogin()}   size="lg" color="success" variant="solid" disabled={errors.length !== 0 || name.length === 0}>Login</Button>
                    {errorFromBack.length > 0 && <p className='mt-2 mb-1 text-red-800'>{errorFromBack}</p>}
            <span className=' font-sans text-lg mt-4 font-medium'>
                You doesnt have an Account?
               <Link className='font-light text-cyan-800 underline ' href='/registration'> Sign in</Link>
            </span>
            </div>
        </main>
    )
}
