import Image from "next/image";
import {IconPokemon} from "@/components/iconPokemon";
import Link from "next/link";
import {IUser} from "@/models/user";
import {useTranslate} from "@tolgee/react";
import {useWindowSize} from "@/hooks/useWindowSize";
type UserCardT = {
    user: IUser
}
export const UserCard = ({user}: UserCardT) => {
    const {t} = useTranslate();
    const {isMobile} = useWindowSize();
    return <Link href={'/cabinet/' + user._id} key={user._id} className='flex items-center justify-between bg-blue-400 m-10 p-5'>
        <Image src={user.img} alt={user.name} width={isMobile ? 50 : 100} height={isMobile ? 50 : 100}/>
        <p className={isMobile ? 'text-lg' : 'text-2xl'}>{t('Arena.nameOfPlayer')} {user.name} </p>
        <p className={isMobile ? 'text-lg' :'text-2xl'}>{t('Arena.rangOfPlayer')} {user.rang} </p>
        <p className={isMobile ? 'text-lg' : 'text-2xl'}>{t('Best.count')} {user.arrPokemons.length} </p>
        <IconPokemon id={user.selectedPokemon} size={isMobile ? 50 : 150}/>
    </Link>
}
