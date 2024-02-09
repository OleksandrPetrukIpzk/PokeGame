'use client'
import {Header} from "@/Header/Header";
import {useAppSelector} from "@/redux/store";
import {MainContent} from "@/app/cabinet/MainContent";
import '../../globals.css'
import {ChangePanel} from "@/app/cabinet/my/ChangePanel";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
export default function MyCabinet(){
    const img = useAppSelector(state =>  state.authReducer.value.img);
    const name = useAppSelector(state => state.authReducer.value.name);
    const email = useAppSelector(state => state.authReducer.value.email);
    const achiveList = useAppSelector(state => state.achiveReducer.value.ids);
    const rang = useAppSelector(state => state.authReducer.value.rang);
    const selectedPokemon = useAppSelector(state => state.authReducer.value.selectedPokemon);
    const arrPokemons = useAppSelector(state => state.authReducer.value.arrPokemons);
   useEmptyAuth();
    return<main>
    <Header/>

        <MainContent img={img} name={name} email={email} achiveList={achiveList} rang={rang} selectedPokemon={selectedPokemon} arrPokemons={arrPokemons}/>
        <ChangePanel/>
    </main>
}
