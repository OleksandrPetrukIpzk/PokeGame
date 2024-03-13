import {Button, Modal} from "@mui/material";
import React, {useState} from "react";
import {ChangeModal} from "@/app/cabinet/my/ChangeModal";
import UserServices from "@/services/userServices";
import AuthServices from "@/services/authServices";
import {DeleteAccount} from "@/app/cabinet/my/DeleteAccount";
import {useTranslate} from "@tolgee/react";
import {tolgee} from "@/app/layout";
import Cookies from "js-cookie";

export const ChangePanel = () =>{
    const { t } = useTranslate();
    const [open, setOpen] = useState(false);
    const [header, setHeader] = useState('');
    const [textButton, setTextButton] = useState('');
    const [changeFunck, setChangeFunk] = useState('')
    const handleChoise = (logo: string, mainContent: string, func: string) => {
        setOpen(true)
        setHeader(logo);
        setTextButton(mainContent);
        setChangeFunk(func)
    }
    const changeLang = (value: string) => {
        Cookies.set('lang', value);
        tolgee.changeLanguage(value);
    }
    return <div className='items-center mt-4 gap-1 flex justify-center'>
        <div>
            <Button variant={tolgee.getLanguage() === 'ua' ? 'solid' : 'outlined'} size="lg"
                    onClick={() => changeLang('ua')}>🇺🇦</Button>
            <Button variant={tolgee.getLanguage() === 'en' ? 'solid' : 'outlined'} size="lg"
                    onClick={() => changeLang('en')}>🇺🇸</Button>
        </div>
        <Button variant='contained'
                onClick={() => handleChoise(t('Profile.isYouChangeName'), t('Profile.changeName'), 'name')}>{t('Profile.changeName')}</Button>
        <Button variant='contained'
                onClick={() => handleChoise(t('Profile.isYouChangeEmail'), t('Profile.changeEmail'), 'email')}>{t('Profile.changeEmail')}</Button>
        <Button variant='contained'
                onClick={() => handleChoise(t('Profile.isYouChangePassword'), t('Profile.changePassword'), 'password')}>{t('Profile.changePassword')}</Button>
        <Button variant='contained'
                onClick={() => handleChoise(t('Profile.isYouChangeImage'), t('Profile.changeImage'), 'img')}>{t('Profile.changeImage')}</Button>
        <DeleteAccount/>
        <ChangeModal mainText={header} children={textButton} func={changeFunck} open={open} setOpen={setOpen}/>
    </div>
}
