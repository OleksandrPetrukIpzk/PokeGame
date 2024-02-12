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
export const DeleteAccount = () =>{
    const [isOpen, setIsOpen] = useState(false);
    const userId = useAppSelector((state) => state.authReducer.value.id);
    const dispatch = useDispatch()
    const router = useRouter()
    const deleteAccount = async () =>{
        try{
            await AuthServices.delete(userId)
            dispatch(logOut())
            localStorage.removeItem(NAME_OF_TOKEN)
          router.push('/registration/')
        } catch (e) {
            errorNotification('Server is not work')
        }
    }
    return(<>
        <Button variant='contained' color="error" onClick={() => setIsOpen(true)}>Delete account</Button>
        <Modal open={isOpen}  onClose={() => setIsOpen(false)}>
            <ModalDialog
                color="danger"
                layout="center"
                variant="soft"
            >
                <ModalClose />
                <Typography>Do you want delete account?</Typography>
                <Button variant='contained' color="error" onClick={() => deleteAccount()}>Delete account</Button>
            </ModalDialog>
        </Modal>
    </>)
}
