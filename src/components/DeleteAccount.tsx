import {useState} from "react";
import {Button} from "@mui/material";
import {ModalClose, ModalDialog, } from "@mui/joy";
import Modal from '@mui/joy/Modal';
import {useAppSelector} from "@/redux/store";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {errorNotification} from "@/functions/pocemons";
import {logOut} from "@/redux/features/auth-slice";
import AuthServices from "@/services/authServices";
import Typography from "@mui/material/Typography";
import {NAME_OF_TOKEN} from "@/constants/pokemons";
import Cookies from "js-cookie";
import {useTranslate} from "@tolgee/react";
export const DeleteAccount = () =>{
    const { t } = useTranslate();
    const [isOpen, setIsOpen] = useState(false);
    const userId = useAppSelector((state) => state.authReducer.value.id);
    const dispatch = useDispatch()
    const router = useRouter()
    const deleteAccount = async () =>{
        try{
            await AuthServices.delete(userId)
            dispatch(logOut())
            Cookies.remove(NAME_OF_TOKEN)
          router.push('/registration/')
        } catch (e) {
            errorNotification('Server is not work')
        }
    }
    return(<>
        <Button variant='contained' color="error" onClick={() => setIsOpen(true)}>{t('Profile.delete')}</Button>
        <Modal open={isOpen}  onClose={() => setIsOpen(false)}>
            <ModalDialog
                color="danger"
                layout="center"
                variant="soft"
            >
                <ModalClose />
                <Typography>{t('Profile.isDelete')}</Typography>
                <Button variant='contained' color="error" onClick={() => deleteAccount()}>{t('Profile.delete')}</Button>
            </ModalDialog>
        </Modal>
    </>)
}
