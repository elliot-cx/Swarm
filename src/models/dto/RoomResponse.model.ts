import { Bot } from '../Bot/Bot';

export type PostRoomData = {
    id: string,
    name: string,
    type: string,
    nbPlayers: number,
    bots: Bot[]
}

export type RoomResponse = {
    success: PostRoomData ;
}

export type RoomResponseList = {
    success: PostRoomData[];
}

export type JKLMResponse = {
    success: JKLMRoom[];
}

export type JKLMRoom = {
    roomCode: string,
    name: string,
    isPublic: boolean,
    gameId: string,
    playerCount: number,
    chatMode: string,
    beta: unknown,
    details: string
}

