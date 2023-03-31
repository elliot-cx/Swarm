export enum BotStatus{
    CONNECTED = "connected",
    BANNED = "banned",
    DISCONNECTED = "disconnected",
    ACTIVE = "active"
}

export enum BotAction{
    START = "start",
    STOP = "stop",
    DISCONNECT = "disconnect",
    CONNECT = "connect"
}

export interface Bot{
    socket: any,
    type: string,
    name: string,
    status: BotStatus,
    token: string,

    connect(roomCode: string,url: string): void,
    disconnect(): void,
    start(): void,
    stop(): void,
    setStatus(status: BotStatus): void,
    toJSON(): any
}