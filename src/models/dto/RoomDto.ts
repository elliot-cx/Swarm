import { Bot } from "../Bot/Bot";

export type RoomDto = {
    id:string,
    name:string,
    type:string;
    nbPlayers:number,
    isActive:boolean,
    link:string,
    bots:Bot[]
}