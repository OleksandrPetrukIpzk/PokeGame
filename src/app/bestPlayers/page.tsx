'use client'
import {Header} from "@/components/Header";
import {useEffect, useState} from "react";
import UserServices from "@/services/userServices";
import '../globals.css'
import {IUser} from "@/models/user";
import Image from "next/image";
import Link from "next/link";
import {Option, Select} from "@mui/joy";
import {IconPokemon} from "@/components/iconPokemon";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {useTranslate} from "@tolgee/react";
export default function BestPlayers (){
    const {t} = useTranslate();
    const [users, setUsers] = useState<IUser[]>([]);
    const [defaultUsers, setDefaultUsers] = useState<IUser[]>([]);
    useEffect(() => {
        const getAllUsers = async () => {
            const response = await UserServices.getAll();
            setUsers(response.data.sort((a, b) => b.rang - a.rang));
            setDefaultUsers(response.data.sort((a, b) => b.rang - a.rang));
        }
        getAllUsers();
    }, []);
    const handleChange = ( event: React.SyntheticEvent | null,
                           newValue: string | null,) => {
        if(newValue == 'count'){
            const sortedArr = JSON.parse(JSON.stringify(users));
            setUsers(sortedArr.sort((a, b) => b.arrPokemons.length - a.arrPokemons.length));
        } else{
            setUsers(defaultUsers);
        }
    }
    useEmptyAuth();

    return(<main>
        <Header />
        <div>
            <Select defaultValue={'rating'} onChange={handleChange}>
                <Option value={'rating'}>{t('Best.rating')}</Option>
                <Option value={'count'}>{t('Best.catch')}</Option>
            </Select>
        </div>
        {users.map((user) =>{
            return <Link href={'/cabinet/' + user._id} key={user._id} className='flex items-center justify-between bg-blue-400 m-10 p-5'>
                <Image src={user.img} alt={user.name} width={100} height={100}/>
                <p className='text-2xl'>{t('Arena.nameOfPlayer')} {user.name} </p>
                <p className='text-2xl'>{t('Arena.rangOfPlayer')} {user.rang} </p>
                <p className='text-2xl'>{t('Best.count')} {user.arrPokemons.length} </p>
                <IconPokemon id={user.selectedPokemon} size={150}/>
            </Link>
        })}
    </main>)
}
