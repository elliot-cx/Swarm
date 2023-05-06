import {Bot} from "../bots/Bot";

export type RoomDto = {
    id: string,
    name: string,
    type: string,
    nbPlayer: number,
    bots: Bot[]
}