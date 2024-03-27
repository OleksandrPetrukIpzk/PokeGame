'use client'
import Image from "next/image";
import {useState} from "react";
import {useAppSelector} from "@/redux/store";
import {useDispatch} from "react-redux";
import {Header} from "@/components/Header";
import UserServices from "@/services/userServices";
import {NUMBER_ONE} from "@/constants/pokemons";
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
import {changeCountOfMoney, setPotions} from "@/redux/features/auth-slice";
import {IconPokemon} from "@/components/iconPokemon";
import Link from "next/link";
import {IMAGE_POTIONS, POTIONS} from "@/constants/user";
import {useTranslate} from "@tolgee/react";
import {buyPokemon, handleBuyPotions} from "@/functions/asyncFynctions";
export default function Store () {
    const {t} = useTranslate()
    const [isClicked, setIsClicked] = useState(false);
    const [numberPokemon, setNumberPokemon] = useState(1);
    const {coins, arrPokemons, id, arrPotions} = useAppSelector((state) => state.authReducer.value);
    const {countOfPokemons, countOfLoseCoins, ids} = useAppSelector((state) => state.achiveReducer.value)
    const dispatch = useDispatch()
   useEmptyAuth();
    return(<main className='get-pokemon flex  flex-col main'>
                <Header/>
                <div className='flex align-middle justify-center items-center'>
                    <div className='flex flex-col items-center'>
                    {isClicked ?<Link href={'/pokemon/' + numberPokemon.toString()}>
                        <IconPokemon id={numberPokemon.toString()} size={200} /></Link>
                        :
                        <Image width={150} height={150} src='/Daco_659762.png' alt='Daco_659762.png'/>}
                {<Button endIcon={<AddShoppingCartIcon/>} className='get-pokemon-button' onClick={() => buyPokemon(coins, arrPokemons, setNumberPokemon, id, setIsClicked, dispatch, countOfPokemons, ids, t, countOfLoseCoins)}> {coins >= NUMBER_ONE ? t('Store.buy') : t('Store.no')}</Button>}
                    </div>
                    {
                        POTIONS.map(potion => {
                            const indexIMG = IMAGE_POTIONS.findIndex(item => item.id === potion.id);
                           return (<div className='flex flex-col items-center'>
                                <Image
                                    src={IMAGE_POTIONS[indexIMG].image}
                                    alt={potion.name}
                                    width={200}
                                    height={200}
                                />
                               <Button
                                   endIcon={<AddShoppingCartIcon/>}
                                   className='get-pokemon-button'
                                   onClick={() => handleBuyPotions(potion.id, coins, arrPotions, dispatch, id, countOfLoseCoins, ids, t)}>
                                   {coins >= NUMBER_ONE ? (t('Store.potion') + potion.name ): t('Store.no')}
                               </Button>
                            </div>)
                        })
                    }
                </div>
            </main>)
}
