import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {getAuth} from "@/functions/auth";
import {NAME_OF_TOKEN} from "@/constants/pokemons";
import {useAppSelector} from "@/redux/store";
import Cookies from "js-cookie";

export const useAuth = (mainRouterPath:string, routerPath:string) =>{
    const dispatch = useDispatch();
    const id = useAppSelector(state => state.authReducer.value.id)
    const router = useRouter()
    useEffect(() => {
        if(Cookies.get(NAME_OF_TOKEN)){
            getAuth(dispatch, id, router);
            router.push(`/${mainRouterPath}`)
        } else{
            router.push(`/${routerPath}`)
        }
    },[])
 }
