'use client'
import {CardPokemon} from "@/app/cardPokemon";
import Image from "next/image";
import { useState} from "react";
import {useAppSelector} from "@/redux/store";
import {useDispatch} from "react-redux";
import {Header} from "@/Header/Header";
import AuthServices from "@/services/authServices";
import {buyElement} from "@/redux/features/auth-slice";
import UserServices from "@/services/userServices";
import {NUMBER_ONE} from "@/constants/pokemons";
import {isIncludesPokemon, isMoreOneCoin, randomPokemonNumber} from "@/functions/pocemons";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {Button} from "@mui/material";
import '../globals.css'
export default function Store () {
    const [isClicked, setIsClicked] = useState(false);
    const [numberPokemon, setNumberPokemon] = useState(1);
    const coins = useAppSelector((state) => state.authReducer.value.coins);
    const arrPokemons = useAppSelector((state) => state.authReducer.value.arrPokemons)
   const email = useAppSelector((state) => state.authReducer.value.email);
    const dispatch = useDispatch()
    const handleClickButton = async () => {
        if(isMoreOneCoin(coins)) {
            let randomNumber = randomPokemonNumber();
                if(isIncludesPokemon(arrPokemons, randomNumber)){
                    setNumberPokemon(randomNumber);
                    const number = coins - NUMBER_ONE;
                    await AuthServices.addPokemon(randomNumber.toString(), number)
                    setIsClicked(true);
                    dispatch(buyElement(coins - NUMBER_ONE))
                } else{
                    dispatch(buyElement(coins + NUMBER_ONE))
                    const number = coins + NUMBER_ONE;
                    await UserServices.addCoins(email, number);
                }

        }
    }
   useEmptyAuth();
    return(<>
            <main className='get-pokemon flex  flex-col main'>
                <Header/>
                <div className='flex align-middle flex-col justify-center items-center'>
                <div className='get-pokemon-icon'>
                    {isClicked ? <CardPokemon pokemon={{url:'https://pokeapi.co/api/v2/pokemon/' + numberPokemon, name: numberPokemon}} isLoaded={true} /> : <Image width={100} height={100} src='/Daco_659762.png' alt='Daco_659762.png'/>}
                </div>
                {<Button endIcon={<AddShoppingCartIcon/>} className='get-pokemon-button' onClick={() => handleClickButton()}> {coins > NUMBER_ONE ? 'Get Lucky 1 coin' : 'Yo doesnt have enough money'}</Button>}
                </div>
            </main>
        </>)
}
