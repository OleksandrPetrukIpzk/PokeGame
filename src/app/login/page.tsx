"use client"
import React, {useState} from 'react'
import '../globals.css'
import Link from "next/link";
import AuthServices from "@/services/authServices";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {logIn} from "@/redux/features/auth-slice";
import {useRouter} from "next/navigation";
import {EMPTY_STRING, NAME_OF_TOKEN} from "@/constants/pokemons";
import {useAuth} from "@/hooks/useAuth";
export default function Login () {
    const [email, setEmail] = useState(EMPTY_STRING);
    const [password, setPassword] = useState(EMPTY_STRING);
    const [userName, setUserName] = useState(EMPTY_STRING);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const  clickLogin = async () =>{
        try {
            const response = await AuthServices.logIn(userName, email, password);
            console.log(response.data.access_token)
            localStorage.setItem(NAME_OF_TOKEN, response.data.access_token);
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
            router.push('/menu')
        } catch (e) {
        }
    }
    const changeEmail = (value:string) =>{
        setEmail(value);
    }
    const changePassword = (value:string) =>{
        setPassword(value);
    }

    const changeName = (value:string) =>{
        setUserName(value);
    }

    useAuth('menu', 'login');

    return(
        <>
        <main className='flex'>
            <div className='flex flex-col login-left'>
                <p className='login-left-name'>PokeGame.com</p>
                <p className='login-left-text'>PokeGame.com is the best place to enjoy a good game.</p>
            </div>
                <div className='flex flex-col login-right'>
                 <p className='login-right-text'>Login an your account</p>
                    <input className='login-input' value={userName} placeholder='User name' onChange={(e) => changeName(e.target.value)} type='text'/>
                <input className='login-input' value={email} placeholder='Email' onChange={(e) => changeEmail(e.target.value)} type='text'/>
                <input className='login-input' value={password} placeholder='Password' onChange={(e) => changePassword(e.target.value)} type='password'/>
                <button onClick={() => clickLogin()} className='login-button'>Login</button>
            <p className='login-redirect'>You doesnt have an Account? <Link className='login-redirect-link' href='/registration'>Sign in</Link></p>
            </div>
        </main>
        </>
    )
}
