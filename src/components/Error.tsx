import React from "react";
import {useTranslate} from "@tolgee/react";

type ErrorT = {
    name: string
}

export const Error = ({name}: ErrorT) =>{
    const {t} = useTranslate()
    return <div className={'flex justify-center items-center'}>
        <p>{t('Pokemon.404')}</p>
        <p>{t('Pokemon.404Name', {name})}</p>
    </div>
}
