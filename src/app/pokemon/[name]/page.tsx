'use client'
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {Abilities} from "@/components/abilities";
import {BackdropColorPokemon} from "@/components/backdropColorPokemon";
import '../../globals.css'
import {Header} from "@/components/Header";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@/redux/store";
import {selectPokemon} from "@/redux/features/auth-slice";
import UserServices from "@/services/userServices";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {Button} from "@mui/material";
import {choicePokemon} from "@/functions/choicePokemon";
import {Error} from "@/components/Error";
import {SwitchButton} from "@/components/SwithButton";
import {isTheSame} from "@/functions/logic";
import {PokemonDetailInfo} from "@/components/PokemonDetailInfo";
import {Ability} from "@/constants/types";
import {useTranslate} from "@tolgee/react";
import {EvolutedPokemon} from "@/components/EvolutedPokemon";
import {useRouter} from "next/navigation";

type Props = {
    params: {
        name: string,
    }
}

export default function Pokemon({params: {name}}: Props) {
    const {t} = useTranslate();
    const [pokemonInfo, setPokemonInfo] = useState({});
    const [nextId, setNextId] = useState("1");
    const [prevId, setPrevId] = useState("1");
    const [isError, setIsError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);
    const [types, setTypes] = useState<Ability[]>([{type:{ name: '', slot: 0, url: '' }}] );
    const [evolutionData, setEvolutionData] = useState([]);
    const [bgColor, setBgColor] = useState('white');
    const selectedPokemon = useAppSelector((state) => state.authReducer.value.selectedPokemon);
    const arrPokemons = useAppSelector((state) => state.authReducer.value.arrPokemons);
    const coins = useAppSelector(state => state.authReducer.value.coins);
    const id = useAppSelector((state) => state.authReducer.value.id);
    const dispatch = useDispatch();
    const router = useRouter();
    const clickHandleSelectPokemon = async () =>{
        const response = await UserServices.changeCurrentPokemonById(id, pokemonInfo.id?.toString())
        dispatch(selectPokemon(pokemonInfo.id?.toString()));

    }
    const updatePokemon = async (lvl: number, idUpdate: string) =>{
     const url = evolutionData[lvl].pokemon.url;
        const segments = url.split('/');
        const pokemonId = segments[segments.length - 2];
        if(selectedPokemon === idUpdate){
            await UserServices.changeCurrentPokemonById(id, pokemonId);
        }
        await UserServices.removePokemon(id, idUpdate);
        await UserServices.addPokemon(id, pokemonId);
        await UserServices.changeCountOfMoney(id, coins - (lvl * 20));
        router.push('/pokemon/' + pokemonId);
    }
    useEmptyAuth()
    useEffect(() => {
        choicePokemon(setNextId, setPrevId, setPokemonInfo, setTypes, setIsError, name, setEvolutionData);
        setIsLoaded(false);
    }, []);
    return (<main style={{backgroundColor: bgColor}}>
        <Header/>
        {isLoaded ? <p>{t('Library.loading')}</p> : isError ? <Error name={name}/> :
            <div>
                <SwitchButton id={prevId} styles={'absolute link-swith-pokemon left-4'} text={t('Library.prev')}/>
                <BackdropColorPokemon types={types} setBgColor={setBgColor}/>
                <SwitchButton id={nextId} styles={'absolute link-swith-pokemon link-right'} text={t('Library.next')}/>
                <Image className='m-auto relative top-5' style={{width: '400px', height: '400px'}} width={300} height={300} src={pokemonInfo.photoURL} decoding={"async"}
                       alt={pokemonInfo.altPhotoURL}/>
                <div className='flex m-auto text-center items-center flex-col pt-10 rounded-3xl ml-10 mr-10'
                     style={{background: '#FFF'}}>
                    <Abilities types={types} isLoaded={isLoaded}/>
                    <div className='flex flex-col'>
                        {isTheSame(selectedPokemon, pokemonInfo.id?.toString()) &&
                            <Button color='success'>{t('Pokemon.selected')}</Button>}
                        {arrPokemons.includes(pokemonInfo.id?.toString()) && !isTheSame(selectedPokemon, pokemonInfo.id?.toString()) &&
                            <Button onClick={() => clickHandleSelectPokemon()}>{t('Pokemon.select')}</Button>}
                    </div>
                    <PokemonDetailInfo pokemonInfo={pokemonInfo}/>
                    <div className="flex justify-center">
                        {evolutionData.map(pokemon => <EvolutedPokemon lvl={pokemon.level} maxLvl={evolutionData.length}
                                                                       name={pokemon.pokemon.name}
                                                                       link={pokemon.pokemon.url} updatePokemon={updatePokemon}/>)}
                    </div>
                </div>

            </div>
        }
    </main>)
}
