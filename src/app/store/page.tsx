'use client'
import Image from "next/image";
import {useState} from "react";
import {useAppSelector} from "@/redux/store";
import {useDispatch} from "react-redux";
import {Header} from "@/Header/Header";
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
import {IconPokemon} from "@/IconPokemon/iconPokemon";
import Link from "next/link";
import {IMAGE_POTIONS, POTIONS} from "@/constants/user";
import {useTranslate} from "@tolgee/react";
export default function Store () {
    const {t} = useTranslate()
    const [isClicked, setIsClicked] = useState(false);
    const [numberPokemon, setNumberPokemon] = useState(1);
    const coins = useAppSelector((state) => state.authReducer.value.coins);
    const arrPokemons = useAppSelector((state) => state.authReducer.value.arrPokemons)
    const id = useAppSelector((state) => state.authReducer.value.id);
    const countOfPokemons = useAppSelector((state) => state.achiveReducer.value.countOfPokemons)
    const countOfLoseCoins = useAppSelector((state) => state.achiveReducer.value.countOfLoseCoins);
    const arrPotions = useAppSelector((state) => state.authReducer.value.arrPotions)
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
                    addAchives(id, 'countOfPokemons', countOfPokemons, dispatch, ids, t('Notification.pokemons'), addCountOfPokemons, t);
                    addAchives(id, 'countOfLoseCoins', countOfLoseCoins, dispatch, ids, t('Notification.loseCoins'), addCountOfLoseCoins, t);
                } else{
                    dispatch(changeCountOfMoney(coins + NUMBER_ONE))
                    const number = coins + NUMBER_ONE;
                    await UserServices.changeCountOfMoney(id, number);
                    errorNotification(t('You have this pokemon you get 1 more coin'))
                }
        }
    }
    const handleBuyPotions = async (idPotions: number) =>{
        if(isMoreOneCoin(coins)){
            const updatedArrPotions = JSON.parse(JSON.stringify(arrPotions));
            let index = 0;
            if(arrPotions.findIndex(item => item.id.toString() === idPotions.toString()) !== -1){
                index = arrPotions.findIndex(item => item.id === idPotions);
                const updateCount = updatedArrPotions[index].count + NUMBER_ONE;
                updatedArrPotions[index].count = updateCount;
            } else {
                index = POTIONS.findIndex(item => item.id === idPotions);
                updatedArrPotions?.push(POTIONS[index]);
            }
            dispatch(setPotions(updatedArrPotions));
            dispatch(changeCountOfMoney(coins - NUMBER_ONE));
            addAchives(id, 'countOfLoseCoins', countOfLoseCoins, dispatch, ids, t('Notification.loseCoins'), addCountOfLoseCoins, t);
            await UserServices.setPotions(id, updatedArrPotions);
            await UserServices.changeCountOfMoney(id, coins - NUMBER_ONE);
        }
    }
   useEmptyAuth();
    return(<>
            <main className='get-pokemon flex  flex-col main'>
                <Header/>
                <div className='flex align-middle justify-center items-center'>
                    <div className='flex flex-col items-center'>
                    {isClicked ?<Link href={'/pokemon/' + numberPokemon.toString()}>
                        <IconPokemon id={numberPokemon.toString()} size={200} /></Link>
                        :
                        <Image width={150} height={150} src='/Daco_659762.png' alt='Daco_659762.png'/>}
                {<Button endIcon={<AddShoppingCartIcon/>} className='get-pokemon-button' onClick={() => handleClickButton()}> {coins >= NUMBER_ONE ? t('Store.buy') : t('Store.no')}</Button>}
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
                                   onClick={() => handleBuyPotions(potion.id)}>
                                   {coins >= NUMBER_ONE ? (t('Store.potion') + potion.name ): t('Store.no')}
                               </Button>
                            </div>)
                        })
                    }
                </div>
            </main>
    </>)
}
