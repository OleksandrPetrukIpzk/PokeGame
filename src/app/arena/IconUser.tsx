import {IconPokemon} from "@/IconPokemon/iconPokemon";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export const IconUser = ({id, img, rang, name}: {id: string, img: string, rang: number, name: string}) =>{
    return <div className='flex items-center items-stretch'>
        <Link href={'/cabinet/'+ id}>
        <Image src={img} alt={img} width={100} height={100}/>
        <div className='flex flex-col justify-around p-5'>
            <p className="">Name: {name}</p>
            <p className=''>Rang: {rang}</p>
        </div>
        </Link>
    </div>
}
