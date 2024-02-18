import {useEffect} from "react";
import {getAuth} from "@/functions/auth";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@/redux/store";
import {useRouter} from "next/navigation";

export const useEmptyAuth = (dependence= []) =>{
    const dispatch = useDispatch();
    const id = useAppSelector(state => state.authReducer.value.id);
    const router = useRouter()
    useEffect(() => {
            getAuth(dispatch, id, router);
    }, dependence);
}
