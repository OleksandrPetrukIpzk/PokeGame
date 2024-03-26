import Button from "@mui/joy/Button";
import React, {Dispatch, SetStateAction} from "react";
import {useTranslate} from "@tolgee/react";

type ControlT = {
    previousUrl: string,
    setBaseUrl: Dispatch<SetStateAction<string>>,
    setIsLoaded: Dispatch<SetStateAction<boolean>>,
    nextUrl: string
}

export const ControlButtons = ({previousUrl, setBaseUrl, setIsLoaded, nextUrl}: ControlT) =>{
    const {t} = useTranslate();
    return (<div className={'w-max flex gap-3 items-center m-auto'}>
        <Button
            color="success"
            loading={false}
            onClick={() => {
                setBaseUrl(previousUrl);
                setIsLoaded(false);
            }}
            size="md"
            variant="solid"
            disabled={!previousUrl}
        >{t('Library.prev')}</Button>
        <Button
            color="success"
            loading={false}
            onClick={() => {
                setBaseUrl(nextUrl);
                setIsLoaded(false);
            }
            }
            size="md"
            variant="solid"
            disabled={!nextUrl}
        >{t('Library.next')}</Button>
    </div>)
}
