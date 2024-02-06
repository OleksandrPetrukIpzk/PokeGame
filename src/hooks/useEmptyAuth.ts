import {useEffect} from "react";
import {getAuth} from "@/functions/auth";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@/redux/store";
import {NAME_OF_TOKEN} from "@/constants/pokemons";

export const useEmptyAuth = (dependence= []) =>{
    const dispatch = useDispatch();
    const id = useAppSelector(state => state.authReducer.value.id)
    useEffect(() => {
        if (localStorage.getItem(NAME_OF_TOKEN)) {
            getAuth(dispatch, id);
        }
    }, dependence);
}
