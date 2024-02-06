import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NUMBER_ZERO} from "@/constants/pokemons";

type InitialState = {
    value: AchievementsState
}
type AchievementsState = {
    ids: number[],
    click: number,
    countOfWins: number,
    countOfLose: number,
    countOfPokemons: number,
    countOfStage: number,
    countOfLoseCoins: number,
    countOfRichCoins: number,
}

const initialState = {
    value:{
        ids: [],
        click: NUMBER_ZERO,
        countOfWins: NUMBER_ZERO,
        countOfLose: NUMBER_ZERO,
        countOfPokemons: NUMBER_ZERO,
        countOfStage: NUMBER_ZERO,
        countOfLoseCoins: NUMBER_ZERO,
        countOfRichCoins: NUMBER_ZERO,
    } as AchievementsState
} as InitialState

export const achive = createSlice({
    name: 'achive',
    initialState,
    reducers: {
        remove:(state, payload) =>{
          return initialState
        },
        start: (state, action: PayloadAction<{ids: number[], click: number, countOfWins: number, countOfLose: number, countOfPokemons: number, countOfStage: number, countOfLoseCoins: number, countOfRichCoins: number}>) =>{
          return {
              ...state,
              value: {
                  ids: action.payload.ids,
                  click: action.payload.click,
                  countOfWins: action.payload.countOfWins,
                  countOfLose: action.payload.countOfLose,
                  countOfPokemons: action.payload.countOfPokemons,
                  countOfStage: action.payload.countOfStage,
                  countOfLoseCoins: action.payload.countOfLoseCoins,
                  countOfRichCoins: action.payload.countOfRichCoins,
              }
          }
        },
        addId: (state, action: PayloadAction<number[]>) =>{
          return {
              ...state,
              value:{
                  ...state.value,
                  ids: action.payload
              }
          }
        },
        addClick: (state, action: PayloadAction<number>) =>{
            return {
                ...state,
                value:{
                    ...state.value,
                    click: action.payload
                }
            }
        },
        addCountOfWins: (state, action: PayloadAction<number>) =>{
            return {
                ...state,
                value:{
                    ...state.value,
                    countOfWins: action.payload
                }
            }
        },
        addCountOfLose: (state, action: PayloadAction<number>) =>{
            return {
                ...state,
                value:{
                    ...state.value,
                    countOfLose: action.payload
                }
            }
        },
        addCountOfPokemons: (state, action: PayloadAction<number>) =>{
            return {
                ...state,
                value:{
                    ...state.value,
                    countOfPokemons: action.payload
                }
            }
        },
        addCountOfStage: (state, action: PayloadAction<number>) =>{
            return {
                ...state,
                value:{
                    ...state.value,
                    countOfStage: action.payload
                }
            }
        },
        addCountOfLoseCoins: (state, action: PayloadAction<number>) =>{
            return {
                ...state,
                value:{
                    ...state.value,
                    countOfLoseCoins: action.payload
                }
            }
        },
        addCountOfRichCoins: (state, action: PayloadAction<number>) =>{
            return {
                ...state,
                value:{
                    ...state.value,
                    countOfRichCoins: action.payload
                }
            }
        },
    }
})

export const {remove, start, addCountOfLose, addCountOfLoseCoins, addCountOfPokemons, addCountOfRichCoins, addCountOfStage, addCountOfWins, addId, addClick  } = achive.actions

export default achive.reducer
