import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {retry} from "@reduxjs/toolkit/query";
import {EMPTY_STRING, NUMBER_ONE, NUMBER_ZERO} from "@/constants/pokemons";

type InitialState = {
    value: AuthState;
}

type AuthState = {
    isAuth: boolean,
    userName: string,
    selectedPokemon: string,
    arrPokemons: Array<string>,
    coins: number,
    stageInOfflineArena: number,
    email: string
}

const initialState = {
    value:{
        isAuth: false,
        userName: EMPTY_STRING,
        selectedPokemon:EMPTY_STRING,
        arrPokemons: [],
        coins: NUMBER_ZERO,
        stageInOfflineArena: NUMBER_ONE,
        email: EMPTY_STRING
    } as AuthState,
} as InitialState

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    logOut: () =>{
        return initialState;
    },
  logIn: (state, action: PayloadAction<{userName: string, selectedPokemon:string, arrPokemons: string[], coins: number, stageInOfflineArena: number, email: string}>) =>{
        return {
            value:{
                isAuth: true,
                userName: action.payload.userName,
                selectedPokemon: action.payload.selectedPokemon,
                arrPokemons: action.payload.arrPokemons,
                coins: action.payload.coins,
                stageInOfflineArena: action.payload.stageInOfflineArena,
                email: action.payload.email,
            }
        }
},
    buyElement(state, action: PayloadAction<number>){
        return{
            ...state,
            value:{
                ...state.value,
                coins: action.payload
            }
        }
     },
        selectPokemon(state, action: PayloadAction<string>){
            return{
                ...state,
                value:{
                    ...state.value,
                    selectedPokemon: action.payload
                }
            }
        },
        changeStage(state, action: PayloadAction<number>){
        return{
            ...state,
            value:{
                ...state.value,
                stageInOfflineArena: action.payload
            }
        }
        }
    }
})

export const {logIn, logOut, buyElement, selectPokemon, changeStage} = auth.actions
export default auth.reducer
