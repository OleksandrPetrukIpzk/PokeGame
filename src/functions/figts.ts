import ArenaService from "@/services/arenaService";
import UserServices from "@/services/userServices";
import {RANG_FOR_WIN} from "@/constants/user";

export const sendWinner =  async (whoStart: string, whoDefence: string, whoWin: string, idWhoWin: string, rangWhoWin: number, idWhoLose: string, rangWhoLose: number) => {
    await ArenaService.setFight({
        whoStart,
        whoDefence,
        whoWin
    })
    await UserServices.changeRangById(idWhoWin, rangWhoWin + RANG_FOR_WIN)
    await UserServices.changeRangById(idWhoLose, rangWhoLose - RANG_FOR_WIN)
}


export const checkTypes = (userType: string, selectedType: string) => {
    switch (userType) {
        case 'bug':{
        if('fairy' === selectedType || 'fighting' === selectedType || 'fire' === selectedType || 'flying' === selectedType || 'ghost' === selectedType || 'steel' === selectedType){
            return 0.5
        } else if('dark' === selectedType || 'grass' === selectedType || 'physic' === selectedType){
            return 2
        }
        else {
            return 1
        }
        }
        case 'dark':{
            if('dark' === selectedType || 'fighting' === selectedType || 'fairy' === selectedType  || 'steel' === selectedType){
                return 0.5
            } else if('ghost' === selectedType || 'physic' === selectedType){
                return 2
            }
            else {
                return 1
            }
        }
        case 'dragon':{
            if('steel' === selectedType){
                return 0.5;
            } else if('dragon' === selectedType){
                return 2;
            }
            else if('fairy' === selectedType) {
                return 0;
            } else{
                return 1;
            }
        }
        case 'electric':{
            if('dragon' === selectedType || 'electric' === selectedType || 'grass' === selectedType){
                return 0.5;
            } else if('water' === selectedType || 'flying' === selectedType){
                return 2;
            }
            else if('ground' === selectedType) {
                return 0;
            } else{
                return 1;
            }
        }
        case 'fairy':{
            if('fire' === selectedType || 'poison' === selectedType || 'steel' === selectedType){
                return 0.5;
            } else if('dark' === selectedType || 'dragon' === selectedType  || 'fighting' === selectedType){
                return 2;
            } else{
                return 1;
            }
        }
        case 'fighting':{
            if('bug' === selectedType || 'fairy' === selectedType || 'flying' === selectedType || 'poison' === selectedType || 'physic' === selectedType){
                return 0.5;
            } else if('dark' === selectedType || 'ice' === selectedType || 'normal' === selectedType || 'rock' === selectedType || 'steel' === selectedType){
                return 2;
            }
            else if('ghost' === selectedType) {
                return 0;
            } else{
                return 1;
            }
        }
        case 'fire':{
            if('dragon' === selectedType || 'fire' === selectedType || 'rock' === selectedType || 'water' === selectedType){
                return 0.5;
            } else if('bug' === selectedType || 'grass' === selectedType || 'ice' === selectedType || 'steel' === selectedType ){
                return 2;
            } else{
                return 1;
            }
        }
        case 'flying':{
            if('electric' === selectedType || 'rock' === selectedType || 'steel' === selectedType){
                return 0.5;
            } else if('bug' === selectedType || 'fighting' === selectedType || 'grass' === selectedType){
                return 2;
            } else{
                return 1;
            }
        }
        case 'ghost':{
            if('dark' === selectedType || 'steel' === selectedType){
                return 0.5;
            } else if('ghost' === selectedType || 'physic' === selectedType ){
                return 2;
            }
            else if('normal' === selectedType) {
                return 0;
            } else{
                return 1;
            }
        }
        case 'grass':{
            if('bug' === selectedType || 'dragon' === selectedType || 'fire' === selectedType || 'flying' === selectedType || 'grass' === selectedType || 'poison' === selectedType || 'steel' === selectedType){
                return 0.5;
            } else if('ground' === selectedType || 'rock' === selectedType || 'water' === selectedType){
                return 2;
            } else{
                return 1;
            }
        }
        case 'ground':{
            if('bug' === selectedType || 'grass' === selectedType){
                return 0.5;
            } else if('electric' === selectedType || 'fire' === selectedType || 'poison' === selectedType || 'rock' === selectedType || 'steel' === selectedType){
                return 2;
            }
            else if('flying' === selectedType) {
                return 0;
            } else{
                return 1;
            }
        }
        case 'ice':{
            if('fire' === selectedType || 'ice' === selectedType || 'steel' === selectedType || 'water' === selectedType){
                return 0.5;
            } else if('dragon' === selectedType || 'flying' === selectedType || 'grass' === selectedType || 'ground' === selectedType){
                return 2;
            } else{
                return 1;
            }
        }
        case 'normal':{
            if('rock' === selectedType || 'steel' === selectedType){
                return 0.5;
            }
            else if('ghost' === selectedType) {
                return 0;
            } else{
                return 1;
            }
        }
        case 'poison':{
            if('ghost' === selectedType || 'ground' === selectedType || 'poison' === selectedType || 'rock' === selectedType){
                return 0.5;
            } else if('fairy' === selectedType || 'grass' === selectedType){
                return 2;
            }
            else if('steel' === selectedType) {
                return 0;
            } else{
                return 1;
            }
        }
        case 'physic':{
            if('physic' === selectedType || 'steel' === selectedType){
                return 0.5;
            } else if('fighting' === selectedType || 'poison' === selectedType){
                return 2;
            }
            else if('dark' === selectedType) {
                return 0;
            } else{
                return 1;
            }
        }
        case 'rock':{
            if('fighting' === selectedType || 'ground' === selectedType || 'steel' === selectedType){
                return 0.5;
            } else if('bug' === selectedType || 'fire' === selectedType || 'flying' === selectedType || 'ice' === selectedType){
                return 2;
            } else{
                return 1;
            }
        }
        case 'steel':{
            if('electric' === selectedType || 'fire' === selectedType || 'steel' === selectedType || 'water' === selectedType){
                return 0.5;
            } else if('fairy' === selectedType || 'ice' === selectedType || 'rock' === selectedType){
                return 2;
            } else{
                return 1;
            }
        }
        case 'water':{
            if('grass' === selectedType || 'water' === selectedType || 'dragon' === selectedType){
                return 0.5;
            } else if('rock' === selectedType || 'ground' === selectedType || 'fire' === selectedType){
                return 2;
            } else{
                return 1;
            }
        }
        default: return 1
    }
}
