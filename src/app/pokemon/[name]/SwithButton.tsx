import Link from "next/link";
import React from "react";

export const SwitchButton = ({id, styles, text}: {id: string, styles: string, text: string}) =>{
    return   <Link href={`` + id} className={styles}>
        <button className='swith-pokemon'>{text}</button>
    </Link>
}
