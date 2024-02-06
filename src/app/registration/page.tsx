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
export default function Registration () {
    const [email, setEmail] = useState(EMPTY_STRING);
    const [password, setPassword] = useState(EMPTY_STRING);
    const [name, setName] = useState(EMPTY_STRING);
    const router = useRouter()
    const dispatch = useDispatch();
    const changeEmail = (value:string) =>{
        setEmail(value);
    }
    const changePassword = (value:string) =>{
        setPassword(value);
    }
    const changeName = (value:string) =>{
        setName(value);
    }
    const  clickRegistration = async () =>{
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
            localStorage.setItem(NAME_OF_TOKEN, response.data.access_token)
            router.push('/introduction')
        } catch (e) {
            console.log('func')
        }
    }
    useAuth('menu', 'registration');

    return(
        <>
            <main className='flex'>
                <div className='flex flex-col login-left'>
                    <p className='login-left-name'>PokeGame.com</p>
                    <p className='login-left-text'>PokeGame.com is the best place to enjoy a good game.</p>
                </div>
                <div className='flex flex-col login-right'>
                    <p className='login-right-text'>Register your account</p>
                    <input className='login-input' value={name} placeholder='Name' onChange={(e) => changeName(e.target.value)} type='text'/>
                    <input className='login-input' value={email} placeholder='Email' onChange={(e) => changeEmail(e.target.value)} type='text'/>
                    <input className='login-input' value={password} placeholder='Password' onChange={(e) => changePassword(e.target.value)} type='password'/>
                    <button onClick={() => clickRegistration()} className='login-button'>Register</button>
                    <p className='login-redirect'>You does have an Account? <Link className='login-redirect-link' href='/login'>Log in</Link></p>
                </div>
            </main>
        </>
    )
}
