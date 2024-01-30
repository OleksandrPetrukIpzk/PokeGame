'use client'
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {Header} from "@/Header/Header";
import {Achives} from "./Achives";
import '../globals.css'
export default function Achievements (){
    useEmptyAuth()

    return <main>
    <Header/>
    <Achives/>
    </main>
}
