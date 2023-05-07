import {Bot} from  './Bot/Bot';
export type Room = {
    id: string,
    name: string,
    type: string,
    nbPlayers: number,
    isActive: boolean,
    bots:Bot[]
}