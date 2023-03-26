export enum BotStatus{
    CONNECTED = "connected",
    BANNED = "banned",
    DISCONNECTED = "disconnected",
    ACTIVE = "active"
}

export interface Bot{
    io: any,
    type: string,
    name: string,
    status: BotStatus,
    token: string,
    interval: NodeJS.Timer | null,

    connect(roomCode: string,url: string),
    start()
}