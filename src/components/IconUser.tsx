import React from "react";
import Image from "next/image";
import Link from "next/link";
import {useTranslate} from "@tolgee/react";
import {useWindowSize} from "@/hooks/useWindowSize";

type IconUserT = {
    id: string,
    img: string,
    rang: number,
    name: string
}

export const IconUser = ({id, img, rang, name}: IconUserT) =>{
    const { t } = useTranslate();
    const {isMobile} = useWindowSize();
    return <div className='flex items-center items-stretch'>
        <Link href={'/cabinet/'+ id}>
        <Image src={img} alt={img} width={isMobile ? 50 : 100} height={isMobile ? 50 : 100}/>
        <div className='flex flex-col justify-around p-5'>
            <p>{t('Arena.nameOfPlayer')} {name}</p>
            <p>{t('Arena.rangOfPlayer')} {rang}</p>
        </div>
        </Link>
    </div>
}
