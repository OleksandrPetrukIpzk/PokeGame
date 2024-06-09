import {Box, Button, Modal} from "@mui/material";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {EMPTY_STRING, STYLES_FOR_MODAL} from "@/constants/pokemons";
import Input, {InputPropsColorOverrides} from '@mui/joy/Input';
import {useAppSelector} from "@/redux/store";
import {useDispatch} from "react-redux";
import {ColorPaletteProp, ModalClose} from "@mui/joy";
import {handleChangePersonalData} from "@/functions/asyncFynctions";
import {OverridableStringUnion} from "@mui/types";

type ModalT = {
    mainText: string,
    children: string,
    func: string,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}
export type ColorType = OverridableStringUnion<ColorPaletteProp, InputPropsColorOverrides>

export const ChangeModal = ({mainText, children, func, open, setOpen}: ModalT) =>{
    const [inputValue, setInputValue] = useState(EMPTY_STRING);
    const [colorInput, setColorInput] = useState<ColorType>('neutral')
    const userId = useAppSelector((state) => state.authReducer.value.id);
   const [error, setError] = useState('');
    const dispatch = useDispatch()
    useEffect(() => {
        setInputValue(EMPTY_STRING);
            setColorInput('neutral');
            setError(EMPTY_STRING);
    }, [open]);
    const handleChange = (value: string) =>{
        setInputValue(value)
    }
    const handleClose = () => setOpen(false);

    // @ts-ignore
    // @ts-ignore
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
                {error.length > 0 && <p className='my-2 text-red-800'>{error}</p>}
                <Button onClick={() => handleChangePersonalData(func, inputValue, setColorInput, dispatch, userId, setError)}>{children}</Button>
            </Typography>
        </Box>
    </Modal>
}
