import { SocketIOService } from "../../services/sockets";
import { Utils } from "../../utils/utils";
import { Authentification } from "../authentification"

export enum BotStatus{
    CONNECTED = "connected",
    BANNED = "banned",
    DISCONNECTED = "disconnected",
    ACTIVE = "active",
    STOPPED = "stop"
}

export enum BotAction{
    START = "start",
    STOP = "stop",
    DISCONNECT = "disconnect",
    CONNECT = "connect"
}

export enum BotType{
    SPAM = "spam",
    RESPONDER = "responder",
    TRACKER = "tracker",
    VIDEO = "video"
}

export class Bot{

    socket: any;
    name: string;
    status: BotStatus;
    token: string;
    auth: Authentification | null;

    private roomCode: string | undefined;

    constructor(name: string){
        this.socket = require('socket.io-client');
        this.token =  Utils.randomString();
        this.auth = null;
        this.name = name;
        this.status = BotStatus.DISCONNECTED;
    }

    // Change la façon dont l'objet est parsé en JSON
    // Ici on veut exclure des propriétés qui ne doivent pas être renvoyées par l'API
    toJSON(){}

    onStatusChanged(status: BotStatus, data?: any){}

    setStatus(status: BotStatus,data?: any) {
        this.status = status;
        this.onStatusChanged(status,data);
        if (this.roomCode) {
            SocketIOService.emitRoom(this.roomCode,"status",this);
        }
    }

    emit(event: string, data: any){
        if (this.socket && this.socket.connected && this.roomCode) {
            this.socket.emit(event,data);
        }
    }

    connect(roomCode: string,url: string){
        this.socket = this.socket.connect(url);
        this.roomCode = roomCode;

        const joinData = {
            "roomCode": roomCode,
            "userToken": this.token,
            "nickname": this.name,
            "auth": null,
            "language": "en-EN"
        };

        this.socket.on("connect",()=>{
            this.socket.emit("joinRoom", joinData, (data:any) => {
                this.setStatus(BotStatus.CONNECTED,data);
            });
        });

        this.socket.on("disconnect",()=>{
            this.setStatus(BotStatus.DISCONNECTED);
            this.socket.removeAllListeners();
        });

        // Bot get ban (mostly)
        this.socket.on("kicked",(reason: any)=>{
            if (this.status == BotStatus.ACTIVE) {
                this.stop();
            }
            this.socket.close();
            this.setStatus(BotStatus.BANNED);
        });

        // this.socket.on("chat", (authProfile: any, message: string) => {
        //     console.log(message);
        // });

        this.socket.on("connect_error",(err:any)=>{
            console.log(err);
            this.setStatus(BotStatus.DISCONNECTED);
            // Auto reconnect
            this.connect(roomCode,url);
        });
    }

    disconnect() {this.socket.close();}

    start() {this.setStatus(BotStatus.ACTIVE);}

    stop() {this.setStatus(BotStatus.STOPPED);}
}