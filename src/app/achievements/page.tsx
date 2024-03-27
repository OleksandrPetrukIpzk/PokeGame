'use client'
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {Header} from "@/components/Header";
import {Achives} from "@/components/Achives";
import '../globals.css'
export default function Achievements (){
    useEmptyAuth()

    return <main>
    <Header/>
    <Achives/>
    </main>
}
