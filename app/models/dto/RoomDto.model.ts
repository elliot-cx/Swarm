import {Bot} from "../bots/Bot";

export type RoomDto = {
    id: string,
    name: string,
    type: string,
    nbPlayers: number,
    bots: Bot[]
}