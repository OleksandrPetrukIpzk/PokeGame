'use client'
import {CardPokemon} from "@/app/cardPokemon";
import Image from "next/image";
import { useState} from "react";
import {useAppSelector} from "@/redux/store";
import {useDispatch} from "react-redux";
import {Header} from "@/Header/Header";
import UserServices from "@/services/userServices";
import {DEFAULT_LINK, NUMBER_ONE} from "@/constants/pokemons";
import {
    errorNotification,
    isIncludesPokemon,
    isMoreOneCoin,
    isRealPokemon,
    randomPokemonNumber
} from "@/functions/pocemons";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {Button} from "@mui/material";
import '../globals.css'
import {addAchives} from "@/functions/achives";
import {addCountOfLoseCoins, addCountOfPokemons} from "@/redux/features/achievements";
import {changeCountOfMoney} from "@/redux/features/auth-slice";
import {IconPokemon} from "@/IconPokemon/iconPokemon";
import Link from "next/link";
export default function Store () {
    const [isClicked, setIsClicked] = useState(false);
    const [numberPokemon, setNumberPokemon] = useState(1);
    const coins = useAppSelector((state) => state.authReducer.value.coins);
    const arrPokemons = useAppSelector((state) => state.authReducer.value.arrPokemons)
    const id = useAppSelector((state) => state.authReducer.value.id);
    const countOfPokemons = useAppSelector((state) => state.achiveReducer.value.countOfPokemons)
    const countOfLoseCoins = useAppSelector((state) => state.achiveReducer.value.countOfLoseCoins)
    const ids  = useAppSelector((state) => state.achiveReducer.value.ids)
    const dispatch = useDispatch()
    const handleClickButton = async () => {
        if(isMoreOneCoin(coins)) {
            let randomNumber = randomPokemonNumber();
            const isPokemon = await isRealPokemon(randomNumber)
                if(isIncludesPokemon(arrPokemons, randomNumber) && isPokemon){
                    setNumberPokemon(randomNumber);
                    const number = coins - NUMBER_ONE;
                    await UserServices.addPokemon(id, randomNumber.toString());
                    await UserServices.changeCountOfMoney(id, number);
                    setIsClicked(true);
                    dispatch(changeCountOfMoney(coins - NUMBER_ONE))
                    addAchives(id, 'countOfPokemons', countOfPokemons, dispatch, ids, 'you have a pokemons ', addCountOfPokemons)
                    addAchives(id, 'countOfLoseCoins', countOfLoseCoins, dispatch, ids, 'You lose coins ', addCountOfLoseCoins)
                } else{
                    dispatch(changeCountOfMoney(coins + NUMBER_ONE))
                    const number = coins + NUMBER_ONE;
                    await UserServices.changeCountOfMoney(id, number);
                    errorNotification('You have this pokemon you get 1 more coin')
                }
        }
    }
   useEmptyAuth();
    return(<>
            <main className='get-pokemon flex  flex-col main'>
                <Header/>
                <div className='flex align-middle justify-center items-center'>
                    <div className='flex flex-col items-center'>
                    {isClicked ?<Link href={'/pokemon/' + numberPokemon.toString()}><IconPokemon id={numberPokemon.toString()} size={200} /></Link>  : <Image width={150} height={150} src='/Daco_659762.png' alt='Daco_659762.png'/>}
                {<Button endIcon={<AddShoppingCartIcon/>} className='get-pokemon-button' onClick={() => handleClickButton()}> {coins >= NUMBER_ONE ? 'Get Lucky 1 coin' : 'Yo doesnt have enough money'}</Button>}
                    </div>
                    </div>
            </main>
        </>)
}
