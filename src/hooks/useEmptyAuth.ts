import {useEffect} from "react";
import {getAuth} from "@/functions/auth";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@/redux/store";

export const useEmptyAuth = (dependence= []) =>{
    const dispatch = useDispatch();
    const id = useAppSelector(state => state.authReducer.value.id)
    useEffect(() => {
            getAuth(dispatch, id);
    }, dependence);
}
