'use client'
import {Header} from "@/components/Header";
import {useAppSelector} from "@/redux/store";
import {MainContent} from "@/components/MainContent";
import {ChangePanel} from "@/components/ChangePanel";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import '../../globals.css'
export default function MyCabinet(){
    const {img, name, email, rang, selectedPokemon, arrPokemons} = useAppSelector(state =>  state.authReducer.value);
    const achiveList = useAppSelector(state => state.achiveReducer.value.ids);
   useEmptyAuth();
    return<main>
    <Header/>
        <MainContent img={img} name={name} email={email} achiveList={achiveList} rang={rang} selectedPokemon={selectedPokemon} arrPokemons={arrPokemons}/>
        <ChangePanel/>
    </main>
}
