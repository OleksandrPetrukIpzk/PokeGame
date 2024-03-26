import {useState} from "react";
import {Button} from "@mui/material";
import {ModalClose, ModalDialog, } from "@mui/joy";
import Modal from '@mui/joy/Modal';
import {useAppSelector} from "@/redux/store";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import Typography from "@mui/material/Typography";
import {useTranslate} from "@tolgee/react";
import {deleteAccount} from "@/functions/asyncFynctions";
export const DeleteAccount = () =>{
    const { t } = useTranslate();
    const [isOpen, setIsOpen] = useState(false);
    const userId = useAppSelector((state) => state.authReducer.value.id);
    const dispatch = useDispatch()
    const router = useRouter()

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
                <Button variant='contained' color="error" onClick={() => deleteAccount(userId, dispatch, router)}>{t('Profile.delete')}</Button>
            </ModalDialog>
        </Modal>
    </>)
}
