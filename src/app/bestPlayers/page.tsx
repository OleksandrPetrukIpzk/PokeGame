'use client'
import {Header} from "@/Header/Header";
import {useEffect, useState} from "react";
import UserServices from "@/services/userServices";
import '../globals.css'
import {IUser} from "@/models/user";
import Image from "next/image";
import Link from "next/link";
import {Option, Select} from "@mui/joy";
import {IconPokemon} from "@/IconPokemon/iconPokemon";
export default function BestPlayers (){
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
    const handleChange = (value: string) => {
        if(value === "Top catch of pokemons"){
            const sortedArr = JSON.parse(JSON.stringify(users));
            setUsers(sortedArr.sort((a, b) => b.arrPokemons.length - a.arrPokemons.length));
        } else{
            setUsers(defaultUsers);
        }
    }
    console.log(users);
    return(<main>
        <Header />
        <div>
            <Select defaultValue={'rating'} onChange={(e) => handleChange(e.target.innerHTML)}>
                <Option value={'rating'}>Top rating</Option>
                <Option value={'count'}>Top catch of pokemons</Option>
            </Select>
        </div>
        {users.map((user) =>{
            return <Link href={'/cabinet/' + user._id} key={user._id} className='flex items-center justify-between bg-blue-400 m-10 p-5'>
                <Image src={user.img} alt={user.name} width={100} height={100}/>
                <p className='text-2xl'>Name: {user.name} </p>
                <p className='text-2xl'>Rang: {user.rang} </p>
                <p className='text-2xl'>Count of pokemons: {user.arrPokemons.length} </p>
                <IconPokemon id={user.selectedPokemon} size={150}/>
            </Link>
        })}
    </main>)
}
