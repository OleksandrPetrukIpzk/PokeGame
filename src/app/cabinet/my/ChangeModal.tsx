import {Box, Button, Modal} from "@mui/material";
import {Dispatch, SetStateAction, useState} from "react";
import Typography from "@mui/material/Typography";
import {STYLES_FOR_MODAL} from "@/constants/pokemons";
import Input from '@mui/joy/Input';
import AuthServices from "@/services/authServices";
import {useAppSelector} from "@/redux/store";
import {validateEmail} from "@/functions/auth";
import {useDispatch} from "react-redux";
import {changeEmail, changeImg, changeName, changePassword} from "@/redux/features/auth-slice";
import {ModalClose} from "@mui/joy";
export const ChangeModal = ({mainText, children, func, open, setOpen}: {mainText: string, children: string, func: string, open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}) =>{
    const [inputValue, setInputValue] = useState('');
    const [colorInput, setColorInput] = useState('neutral')
    const userId = useAppSelector((state) => state.authReducer.value.id);
   const dispatch = useDispatch()
    const handleChange = (value: string) =>{
        setInputValue(value)
    }
    const handleClose = () => setOpen(false);
    const handleClick = async () =>{
        switch (func){
            case 'name': {
                if(inputValue.length >= 3){
                    try {
                        await AuthServices.changeName(userId, inputValue);
                        setColorInput('success')
                        dispatch(changeName(inputValue))
                    }
                    catch (e) {
                        setColorInput('danger')
                    }
                } else {
                    setColorInput('danger')
                }
                break;
            }
            case 'email':{
                if(validateEmail(inputValue)){
                    try {
                        await AuthServices.changeEmail(userId, inputValue)
                        setColorInput('success')
                        dispatch(changeEmail(inputValue))
                    }
                    catch (e) {
                        setColorInput('danger')
                    }
                } else {
                    setColorInput('danger')
                }
                break;
            }
            case 'password': {
                if(inputValue.length >= 5){
                    try {
                        await AuthServices.changePassword(userId, inputValue)
                        setColorInput('success')
                        dispatch(changePassword(inputValue))
                    }
                    catch (e) {
                        setColorInput('danger')
                    }
                } else {
                    setColorInput('danger')
                }
                break;
            }
            case 'img':{
                try {
                    await AuthServices.changeImg(userId, inputValue)
                    setColorInput('success')
                    dispatch(changeImg(inputValue))
                }
                catch (e) {
                    setColorInput('danger')
                }
            }
        }
    }
    return<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={{...STYLES_FOR_MODAL, width: 300}}>
            <ModalClose />
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {mainText}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Input
                    color={colorInput}
                    placeholder={children}
                    size="md"
                    variant="soft"
                    onChange={e => handleChange(e.target.value)}
                />
                <Button onClick={() => handleClick()}>{children}</Button>
            </Typography>
        </Box>
    </Modal>
}
