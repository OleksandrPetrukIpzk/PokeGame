import Image from "next/image";
import {IconPokemon} from "@/components/iconPokemon";
import Link from "next/link";
import {IUser} from "@/models/user";
import {useTranslate} from "@tolgee/react";
type UserCardT = {
    user: IUser
}
export const UserCard = ({user}: UserCardT) => {
    const {t} = useTranslate();
    return <Link href={'/cabinet/' + user._id} key={user._id} className='flex items-center justify-between bg-blue-400 m-10 p-5'>
        <Image src={user.img} alt={user.name} width={100} height={100}/>
        <p className='text-2xl'>{t('Arena.nameOfPlayer')} {user.name} </p>
        <p className='text-2xl'>{t('Arena.rangOfPlayer')} {user.rang} </p>
        <p className='text-2xl'>{t('Best.count')} {user.arrPokemons.length} </p>
        <IconPokemon id={user.selectedPokemon} size={150}/>
    </Link>
}
