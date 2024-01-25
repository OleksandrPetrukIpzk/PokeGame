import {useEffect} from "react";
import {getAuth} from "@/functions/auth";
import {useDispatch} from "react-redux";

export const useEmptyAuth = (dependence= []) =>{
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAuth(dispatch);
        }
    }, dependence);
}
