import {Button, Modal} from "@mui/material";
import {useState} from "react";
import {ChangeModal} from "@/app/cabinet/my/ChangeModal";
import UserServices from "@/services/userServices";
import AuthServices from "@/services/authServices";
import {DeleteAccount} from "@/app/cabinet/my/DeleteAccount";

export const ChangePanel = () =>{
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
    return<div className='items-center mt-4 gap-1 flex justify-center'>
        <Button variant='contained' onClick={() => handleChoise('Do you want change name?', 'Change name', 'name')}>Change name</Button>
        <Button variant='contained' onClick={() => handleChoise('Do you want change email?', 'Change email', 'email')}>Change email</Button>
        <Button variant='contained' onClick={() => handleChoise('Do you want change password?', 'Change password', 'password')}>Change password</Button>
        <Button variant='contained' onClick={() => handleChoise('Do you want change image?', 'Change image', 'img')}>Change image</Button>
        <DeleteAccount/>
        <ChangeModal mainText={header} children={textButton} func={changeFunck} open={open} setOpen={setOpen} />
    </div>
}
