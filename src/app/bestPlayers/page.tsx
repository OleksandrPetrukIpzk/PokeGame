'use client'
import {Header} from "@/components/Header";
import {useEffect, useState} from "react";
import {IUser} from "@/models/user";
import {useEmptyAuth} from "@/hooks/useEmptyAuth";
import {SelectUsers} from "@/components/SelectUsers";
import {UserCard} from "@/components/UserCard";
import {getAllUsersForRating} from "@/functions/asyncFynctions";
import '../globals.css'
export default function BestPlayers (){
    const [users, setUsers] = useState<IUser[]>([]);
    const [defaultUsers, setDefaultUsers] = useState<IUser[]>([]);

    useEffect(() => {
        getAllUsersForRating(setUsers, setDefaultUsers);
    }, []);
    const handleChange = ( event: React.SyntheticEvent | null, newValue: string | null) => {
        if(newValue == 'count'){
            const sortedArr = JSON.parse(JSON.stringify(users));
            setUsers(sortedArr.sort((a: IUser, b: IUser) => b.arrPokemons.length - a.arrPokemons.length));
        } else{
            setUsers(defaultUsers);
        }
    }
    useEmptyAuth();
    return(<main>
        <Header />
       <SelectUsers handleChange={(e: any, newValue: any) => handleChange(e, newValue)}/>
        {users.map((user) =>{
            return <UserCard user={user}/>
        })}
    </main>)
}
