import Link from "next/link";
import {Search} from "@/Header/Search";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAppSelector} from "@/redux/store";
import {logout} from "@/functions/auth";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {Button} from "@mui/material";
export const Header = () =>{
    const userName =  useAppSelector((state) => state.authReducer.value.name);
    const coins = useAppSelector((state) => state.authReducer.value.coins)
    const dispatch = useDispatch()
    const router = useRouter()
    return(
        <header className='flex justify-between ml-10 mr-10 items-center'>
            <p className='stats pt-2 header-text'>PokeGame</p>
            <Search/>
            <Link className='nav-link' href='/menu'>Menu</Link>
            <Link className='nav-link' href='/cabinet/my'>My profile</Link>
            <p className='nav-link'>Hello {userName} you have coins: {coins}</p>
            <Button  color='error' onClick={() => logout(dispatch, router)}>LogOut</Button>
            <ToastContainer/>
        </header>
    )
}
