'use client'
import {Header} from "@/Header/Header";
import {MainContent} from "@/app/cabinet/MainContent";
import {useEffect, useState} from "react";
import {IUser} from "@/models/user";
import {getUserById} from "@/functions/auth";
import {INITIAL_USER} from "@/constants/user";
type Props = {
    params:{
        id: string,
    }
}
export default function CabinetUserById ({params: {id}}: Props) {
    const [userInfo, setUserInfo] = useState<IUser>(INITIAL_USER)
    useEffect(() => {
    getUserById(id, setUserInfo)
    }, []);
    return <main>
        <Header/>
        <MainContent img={userInfo.img} name={userInfo.name} email={userInfo.email} achiveList={userInfo.arrAchives} rang={userInfo.rang} selectedPokemon={userInfo.selectedPokemon} arrPokemons={userInfo.arrPokemons}/>
    </main>
}
