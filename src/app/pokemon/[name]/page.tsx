'use client'
import React, {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {Abilities} from "@/app/pokemon/[name]/abilities";
import {BackdropColorPokemon} from "@/app/pokemon/[name]/backdropColorPokemon";
import '../../globals.css'
import {Header} from "@/Header/Header";
import {DEFAULT_IMAGE, DEFAULT_LINK, NUMBER_ONE, NUMBER_ZERO} from "@/constants/pokemons";
import {useDispatch} from "react-redux";
import {getAuth} from "@/functions/auth";
import {useAppSelector} from "@/redux/store";
import {selectPokemon} from "@/redux/features/auth-slice";
import UserServices from "@/services/userServices";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {checkCurrentImage} from "@/functions/pocemons";
import {Button} from "@mui/material";

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
    const [types, setTypes] = useState([{}, {}]);
    const selectedPokemon = useAppSelector((state) => state.authReducer.value.selectedPokemon);
    const arrPokemons = useAppSelector((state) => state.authReducer.value.arrPokemons);
    const dispatch = useDispatch()
    const clickHandleSelectPokemon = async () =>{
        const response = await UserServices.changeSelectedPokemon(pokemonInfo.id?.toString())
        dispatch(selectPokemon(pokemonInfo.id?.toString()));

    }
    useEmptyAuth()
    useEffect(() => {
        axios.get(DEFAULT_LINK + 'pokemon/' + name).then(info => {
                setNextId((info.data.id + NUMBER_ONE).toString());
                if (info.data.id - NUMBER_ONE > NUMBER_ZERO) {
                    setPrevId((info.data.id - NUMBER_ONE).toString());
                } else {
                    setPrevId(info.data.id.toString());
                }
                setPokemonInfo({
                    name: info.data.name,
                    height: info.data.height,
                    weight: info.data.weight,
                    id: info.data.id,
                    photoURL: checkCurrentImage(info.data.sprites),
                    altPhotoURL: info.data.sprites.other.home.front_default,
                    hp: info.data.stats[0].base_stat,
                    attack: info.data.stats[1].base_stat,
                    defense: info.data.stats[2].base_stat,
                    specialAttack: info.data.stats[3].base_stat,
                    specialDefense: info.data.stats[4].base_stat,
                    speed: info.data.stats[5].base_stat,
                    types: info.data.types,
                });
                setTypes(info.data.types);
            }
        ).catch(() => setIsError(true));
        setIsLoaded(false);
    }, []);

    return (<div>
        <Header/>
        {isLoaded ? <p>loading...</p> : isError ? <div>
                <p>Error 404 </p>
                <p>the {name} is no include in our website</p>
            </div> :
            <div className=''>
                <Link href={`` + prevId} className='absolute link-swith-pokemon left-4'>
                    <button className='swith-pokemon'>Prev</button>
                </Link>
                <BackdropColorPokemon types={types}/>
                <Link href={`` + nextId} className='absolute link-swith-pokemon link-right'>
                    <button className='swith-pokemon'>Next</button>
                </Link>
                <Image className='m-auto relative top-5' style={{width: '400px', height: '400px'}} width={300} height={300} src={pokemonInfo.photoURL} decoding={"async"}
                       alt={pokemonInfo.altPhotoURL}/>
                <div className='flex m-auto text-center items-center flex-col pt-10 rounded-3xl ml-10 mr-10' style={{background: '#FFF'}}>
                <Abilities types={types} isLoaded={isLoaded}/>
                <div className='flex flex-col'>
                    {selectedPokemon === pokemonInfo.id?.toString() && <Button color='success'>Selected</Button>}
                    {arrPokemons.includes(pokemonInfo.id?.toString()) && <Button onClick={() => clickHandleSelectPokemon()}>Select pokemon</Button>}
                </div>
                    <p className='pokemon-name'>{pokemonInfo.name}</p>
                    <p className='pokemon-name' style={{color:'#B8B8B8'}}>About</p>
                    <div className='flex'>
                        <div className='pr-5 mr-5 border-r-2'>
                            <div className='flex items-center mb-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="32" viewBox="0 0 17 16" fill="none">
                                    <path d="M4.28333 13H13.05L12 5.66663H5.33333L4.28333 13ZM8.66667 4.66663C8.95556 4.66663 9.19444 4.5694 9.38333 4.37496C9.57222 4.18051 9.66667 3.9444 9.66667 3.66663C9.66667 3.37774 9.57222 3.13885 9.38333 2.94996C9.19444 2.76107 8.95556 2.66663 8.66667 2.66663C8.38889 2.66663 8.15278 2.76107 7.95833 2.94996C7.76389 3.13885 7.66667 3.37774 7.66667 3.66663C7.66667 3.9444 7.76389 4.18051 7.95833 4.37496C8.15278 4.5694 8.38889 4.66663 8.66667 4.66663ZM10.4 4.66663H12C12.2556 4.66663 12.4778 4.74718 12.6667 4.90829C12.8556 5.0694 12.9667 5.27774 13 5.53329L14.0333 12.8666C14.0778 13.1666 14.0028 13.4305 13.8083 13.6583C13.6139 13.8861 13.3611 14 13.05 14H4.28333C3.97222 14 3.71945 13.8861 3.525 13.6583C3.33056 13.4305 3.25556 13.1666 3.3 12.8666L4.33333 5.53329C4.36667 5.27774 4.47778 5.0694 4.66667 4.90829C4.85556 4.74718 5.07778 4.66663 5.33333 4.66663H6.93333C6.84444 4.51107 6.77778 4.35274 6.73333 4.19163C6.68889 4.03051 6.66667 3.85551 6.66667 3.66663C6.66667 3.11107 6.86111 2.63885 7.25 2.24996C7.63889 1.86107 8.11111 1.66663 8.66667 1.66663C9.22222 1.66663 9.69444 1.86107 10.0833 2.24996C10.4722 2.63885 10.6667 3.11107 10.6667 3.66663C10.6667 3.85551 10.6444 4.03051 10.6 4.19163C10.5556 4.35274 10.4889 4.51107 10.4 4.66663ZM4.28333 13H13.05H4.28333Z" fill="#1D1D1D"/>
                                </svg>
                                <p className='stats'>{pokemonInfo.weight} kg</p>
                            </div>
                            <p className='name-stats'>Weight</p>
                        </div>
                        <div>
                            <div className='flex items-center mb-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16" fill="none">
                                    <path d="M4 2.33337C4 2.06671 4.1 1.83337 4.3 1.63337C4.5 1.43337 4.73333 1.33337 5 1.33337L11 1.33337C11.2556 1.33337 11.4861 1.43337 11.6917 1.63337C11.8972 1.83337 12 2.06671 12 2.33337V13.6667C12 13.9334 11.8972 14.1667 11.6917 14.3667C11.4861 14.5667 11.2556 14.6667 11 14.6667H5C4.73333 14.6667 4.5 14.5667 4.3 14.3667C4.1 14.1667 4 13.9334 4 13.6667L4 2.33337ZM5 2.33337L5 13.6667H11V11.5H8V10.5H11V8.50004H8V7.50004H11V5.50004H8V4.50004H11V2.33337L5 2.33337ZM8 4.50004V5.50004V4.50004ZM8 7.50004V8.50004V7.50004ZM8 10.5V11.5V10.5Z" fill="#1D1D1D"/>
                                </svg>
                                <p className='stats'>{pokemonInfo.height} m</p>
                            </div>
                            <p className='name-stats'>Height</p>
                        </div>
                    </div>
                <div >
                    <p className='pokemon-name mt-10' style={{color:'#B8B8B8'}}>Base Stats</p>
                  <div className='flex items-center mb-3'> <Image width={30} height={30} src='/Heart_corazón.svg.png' alt='1.svg'/> <p className='pl-3'>Hp: {pokemonInfo.hp}</p></div>
                  <div className='flex items-center mb-3'><Image width={30} height={30} src='/8037103.png' alt='8037103.png'/>  <p className='pl-3'>Attack: {pokemonInfo.attack}</p></div>
                  <div className='flex items-center mb-3'><Image width={30} height={30} src='/306771.png' alt='8037103.png'/>  <p className='pl-3'>Defense: {pokemonInfo.defense}</p></div>
                  <div className='flex items-center mb-3'><Image width={30} height={30} src='/3969028-200.png' alt='8037103.png'/>  <p className='pl-3'>Special attack: {pokemonInfo.specialAttack}</p></div>
                   <div className='flex items-center mb-3'><Image width={30} height={30} src='/defense-icon-435x512-f1cww4u8.png' alt='8037103.png'/> <p className='pl-3'>Special defense: {pokemonInfo.specialDefense}</p></div>
                    <div className='flex items-center mb-3'> <Image width={30} height={30} src='/download.png' alt='download.png'/><p className='pl-3'>Speed: {pokemonInfo.speed}</p></div>
                </div>
                </div>
            </div>
        }
    </div>)
}