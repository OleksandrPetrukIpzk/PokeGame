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
