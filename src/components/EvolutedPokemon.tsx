import {isTheSame} from "@/functions/logic";
import {useAppSelector} from "@/redux/store";
import {IconPokemon} from "@/components/iconPokemon";
import {Button} from "@mui/material";
import React from "react";
import {useTranslate} from "@tolgee/react";
import UserServices from "@/services/userServices";
import {selectPokemon} from "@/redux/features/auth-slice";
import {useDispatch} from "react-redux";
import Link from "next/link";

export const EvolutedPokemon = ({name, link, lvl, maxLvl, updatePokemon}: {name: string, lvl: number, maxLvl: number, link: string, updatePokemon: Function}) => {
    const {t} = useTranslate();
    const arrPokemons = useAppSelector((state) => state.authReducer.value.arrPokemons);
    const selectedPokemon = useAppSelector((state) => state.authReducer.value.selectedPokemon);
    const id = useAppSelector((state) => state.authReducer.value.id);
    const coins = useAppSelector(state => state.authReducer.value.coins);
    const segments = link.split('/');
    const pokemonId = segments[segments.length - 2];
    const nextPokemonId = parseInt(pokemonId) + 1;
    const isInclude = arrPokemons.includes(pokemonId);
    const isNextInclude = arrPokemons.includes(nextPokemonId.toString());
    const isMaxLvl = isTheSame(lvl, maxLvl);
    const isSelected = isTheSame(pokemonId, selectedPokemon);
    const dispatch = useDispatch();
    const clickHandleSelectPokemon = async () =>{
        const response = await UserServices.changeCurrentPokemonById(id, pokemonId);
        dispatch(selectPokemon(pokemonId));
    }

    return(<div className={isSelected ? 'bg-amber-200' : isInclude && 'bg-blue-200'} style={{borderRadius: 20, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <IconPokemon id={pokemonId} size={200}/>
        <Link href={'/pokemon/'+pokemonId}>{name}</Link>
        <div className='flex flex-col'>
        {isSelected ? <Button color='success'>{t('Pokemon.selected')}</Button>  : isInclude && <Button onClick={() => clickHandleSelectPokemon()}>{t('Pokemon.select')}</Button> }
        {!isMaxLvl && isInclude && !isNextInclude && <Button disabled={coins < lvl * 20} color='warning' variant='contained' onClick={() => updatePokemon(lvl, pokemonId)}>{t('Pokemon.update') + lvl * 20}</Button>}
        </div>
    </div>)
}
