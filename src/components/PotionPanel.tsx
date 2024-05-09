import {useAppSelector} from "@/redux/store";
import {IMAGE_POTIONS, POTIONS} from "@/constants/user";
import {Button} from "@mui/material";
import Image from "next/image";
import {useTranslate} from "@tolgee/react";
import {NUMBER_ONE, NUMBER_ZERO} from "@/constants/pokemons";
import {isTheSame} from "@/functions/logic";
import {setPotions} from "@/redux/features/auth-slice";
import UserServices from "@/services/userServices";
import {useDispatch} from "react-redux";

export const PotionPanel = ({handleChange}: {handleChange: Function}) => {
    const {t} = useTranslate();
    const arrPotions = useAppSelector((state) => state.authReducer.value.arrPotions);
    const dispatch = useDispatch();
    const id = useAppSelector((state) => state.authReducer.value.id);
    const handleClick = async (idPoints: number) =>{
        const updatedArrPotions = JSON.parse(JSON.stringify(arrPotions));
        let index = NUMBER_ZERO;
        if(!isTheSame(arrPotions.findIndex(item => isTheSame(item.id.toString(), idPoints.toString())), -1)){
            index = arrPotions.findIndex(item => isTheSame(item.id, idPoints));
            const updateCount = updatedArrPotions[index].count - NUMBER_ONE;
            updatedArrPotions[index].count = updateCount;
        } else {
            index = POTIONS.findIndex(item => isTheSame(item.id, idPoints));
            updatedArrPotions?.push(POTIONS[index]);
        }
        dispatch(setPotions(updatedArrPotions));
        await UserServices.setPotions(id, updatedArrPotions);
        handleChange(idPoints);
    }

    return(
        <div className={'flex gap-1 pt-3 flex-wrap content-center '}>
        {arrPotions.map(potion => {
                const indexIMG = IMAGE_POTIONS.findIndex(item => item.id === potion.id);
                return potion.count > 0 && <Button variant="contained" onClick={() => handleClick(potion.id)}>
                    <Image src={IMAGE_POTIONS[indexIMG].image} alt={potion.name} width={50} height={50}/>
                    <p >{potion.name}, {t('Arena.countOfPotion')} {potion.count}</p>
                </Button>
            })}
        </div>
    )

}
