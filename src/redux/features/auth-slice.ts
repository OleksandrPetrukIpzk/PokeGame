import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {EMPTY_STRING, NUMBER_ZERO} from "@/constants/pokemons";
import {Potions} from "@/models/user";

type InitialState = {
    value: AuthState;
}

type AuthState = {
    id: string;
    name: string;
    email: string;
    password: string;
    img: string;
    selectedPokemon: string;
    coins: number;
    rang: number;
    stageInOfflineArena: number;
    arrPokemons: string[];
    arrAchives: number[];
    arrPotions: Potions[];
}

const initialState = {
    value:{
        id: EMPTY_STRING,
        name: EMPTY_STRING,
        email: EMPTY_STRING,
        password: EMPTY_STRING,
        img: EMPTY_STRING,
        selectedPokemon: EMPTY_STRING,
        coins: NUMBER_ZERO,
        rang: NUMBER_ZERO,
        stageInOfflineArena: NUMBER_ZERO,
        arrPokemons: [],
        arrAchives: [],
        arrPotions: [],
    } as AuthState,
} as InitialState

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    logOut: () =>{
        return initialState;
    },
        changePassword:(state, action: PayloadAction<string>) =>{
        return {
            ...state,
            value:{
                ...state.value,
                password: action.payload
            }
        }
        },
        changeName:(state, action: PayloadAction<string>) =>{
            return {
                ...state,
                value:{
                    ...state.value,
                    name: action.payload
                }
            }
        },
        changeEmail:(state, action: PayloadAction<string>) =>{
            return {
                ...state,
                value:{
                    ...state.value,
                    email: action.payload
                }
            }
        },
        changeImg:(state, action: PayloadAction<string>) =>{
            return {
                ...state,
                value:{
                    ...state.value,
                    img: action.payload
                }
            }
        },
        changeRang:(state, action: PayloadAction<number>) =>{
            return {
                ...state,
                value:{
                    ...state.value,
                    rang: action.payload
                }
            }
        },
        setPotions:(state, action: PayloadAction<Potions[]>) =>{
            return {
                ...state,
                value:{
                    ...state.value,
                    arrPotions: action.payload
                }
            }
        },
        changeCountOfMoney:(state, action: PayloadAction<number>) =>{
            return {
                ...state,
                value:{
                    ...state.value,
                    coins: action.payload
                }
            }
        },
  logIn: (state, action: PayloadAction<{id: string,
      name: string,
      email: string,
      password: string,
      img: string,
      selectedPokemon: string,
      coins: number,
      rang: number,
      stageInOfflineArena: number,
      arrPokemons: string[],
      arrAchives: number[],
      arrPotions: Potions[]}>) =>{
        return {
            value:{
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password,
                img: action.payload.img,
                selectedPokemon: action.payload.selectedPokemon,
                coins: action.payload.coins,
                rang: action.payload.rang,
                stageInOfflineArena: action.payload.stageInOfflineArena,
                arrPokemons: action.payload.arrPokemons,
                arrAchives: action.payload.arrAchives,
                arrPotions: action.payload.arrPotions,
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

export const {logIn, setPotions,  logOut, changeRang, changeImg, changeEmail, changePassword, changeName, changeCountOfMoney, selectPokemon, changeStage} = auth.actions
export default auth.reducer
