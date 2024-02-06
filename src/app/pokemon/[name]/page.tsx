'use client'
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {Abilities} from "@/app/pokemon/[name]/abilities";
import {BackdropColorPokemon} from "@/app/pokemon/[name]/backdropColorPokemon";
import '../../globals.css'
import {Header} from "@/Header/Header";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@/redux/store";
import {selectPokemon} from "@/redux/features/auth-slice";
import UserServices from "@/services/userServices";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {Button} from "@mui/material";
import {choicePokemon} from "@/functions/choicePokemon";
import {Error} from "@/app/pokemon/[name]/Error";
import {SwitchButton} from "@/app/pokemon/[name]/SwithButton";
import {isTheSame} from "@/functions/logic";
import {PokemonInfo} from "@/app/pokemon/[name]/PokemonInfo";
import {Ability} from "@/constants/types";

type Props = {
    params: {
        name: string,
    }
}

export default function Pokemon({params: {name}}: Props) {
    const [pokemonInfo, setPokemonInfo] = useState({});
    const [nextId, setNextId] = useState("1");
    const [prevId, setPrevId] = useState("1");
    const [isError, setIsError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);
    const [types, setTypes] = useState<Ability[]>([{type:{ name: '', slot: 0, url: '' }}] );
    const selectedPokemon = useAppSelector((state) => state.authReducer.value.selectedPokemon);
    const arrPokemons = useAppSelector((state) => state.authReducer.value.arrPokemons);
    const id = useAppSelector((state) => state.authReducer.value.id);
    const dispatch = useDispatch()
    const clickHandleSelectPokemon = async () =>{
        const response = await UserServices.changeCurrentPokemonById(id, pokemonInfo.id?.toString())
        dispatch(selectPokemon(pokemonInfo.id?.toString()));

    }
    useEmptyAuth()
    useEffect(() => {
        choicePokemon(setNextId, setPrevId, setPokemonInfo, setTypes, setIsError, name)
        setIsLoaded(false);
    }, []);
    return (<div>
        <Header/>
        {isLoaded ? <p>loading...</p> : isError ? <Error name={name}/> :
            <div>
                <SwitchButton id={prevId} styles={'absolute link-swith-pokemon left-4'} text={'Prev'}/>
                <BackdropColorPokemon types={types}/>
                <SwitchButton id={nextId} styles={'absolute link-swith-pokemon link-right'} text={'Next'}/>
                <Image className='m-auto relative top-5' style={{width: '400px', height: '400px'}} width={300} height={300} src={pokemonInfo.photoURL} decoding={"async"}
                       alt={pokemonInfo.altPhotoURL}/>
                <div className='flex m-auto text-center items-center flex-col pt-10 rounded-3xl ml-10 mr-10' style={{background: '#FFF'}}>
                <Abilities types={types} isLoaded={isLoaded}/>
                <div className='flex flex-col'>
                    {isTheSame(selectedPokemon, pokemonInfo.id?.toString()) && <Button color='success'>Selected</Button>}
                    {arrPokemons.includes(pokemonInfo.id?.toString()) && <Button onClick={() => clickHandleSelectPokemon()}>Select pokemon</Button>}
                </div>
                    <PokemonInfo pokemonInfo={pokemonInfo}/>
                </div>
            </div>
        }
    </div>)
}
