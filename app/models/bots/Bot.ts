import { BotAuthentificationService } from "../../services/botAuthentification";
import { reCaptcha } from "../../services/reCaptcha";
import { SocketIOService } from "../../services/sockets";
import { Utils } from "../../utils/utils";
import { Authentification } from "../authentification";
import { HttpsProxyAgent } from "https-proxy-agent";

export enum BotStatus {
    CONNECTING = "connecting",
    CONNECTED = "connected",
    BANNED = "banned",
    DISCONNECTED = "disconnected",
    ACTIVE = "active",
    STOPPED = "stop"
}

export enum BotAction {
    START = "start",
    STOP = "stop",
    DISCONNECT = "disconnect",
    CONNECT = "connect"
}

export enum BotType {
    SPAM = "spam",
    RESPONDER = "responder",
    TRACKER = "tracker",
    VIDEO = "video"
}

export class Bot {
    id: string;
    socket: any;
    name: string;
    status: BotStatus;
    token: string;
    auth: Authentification | null;
    peerId: number | undefined;
    // Enable access properties from key like -> Object[propertyName]
    [key: string]: any;

    protected roomCode: string = "";

    constructor(name: string) {
        this.id = Utils.randomString();
        this.socket = require('socket.io-client');
        this.token = Utils.randomString();
        this.auth = BotAuthentificationService.getAuthentification();
        this.name = name;
        this.status = BotStatus.DISCONNECTED;
    }

    // Change la façon dont l'objet est parsé en JSON
    // Ici on veut exclure des propriétés qui ne doivent pas être renvoyées par l'API
    toJSON() { }

    onStatusChanged(status: BotStatus, data?: any) { }

    setStatus(status: BotStatus, data?: any) {
        this.status = status;
        this.onStatusChanged(status, data);
        if (this.roomCode) {
            SocketIOService.emitRoom(this.roomCode, "status", this);
        }
    }

    emit(event: string, ...data: any) {
        if (this.socket && this.socket.connected && this.roomCode) {
            this.socket.emit(event, ...data);
        }
    }

    connect(roomCode: string, url: string) {
        this.roomCode = roomCode;
        this.token = Utils.randomString();
        this.setStatus(BotStatus.CONNECTING);
        const proxyUrl = 'http://swarm_client:Test123@pr.oxylabs.io:7777';
        const agent = new HttpsProxyAgent(proxyUrl);
        this.socket = this.socket.connect(url,{agent: agent});

        this.socket.on("connect", async () => {
            const gcToken = await reCaptcha.resolveCaptcha();
            const joinData = {
                "roomCode": roomCode,
                "userToken": this.token,
                "nickname": this.name,
                "auth": BotAuthentificationService.getAuthentification(),
                "language": "fr-FR",
                "token": gcToken
            };
            this.socket.emit("joinRoom", joinData, (data: any) => {
                this.peerId = data.selfPeerId; // To know the bot connexion id from JKLM server
                this.setStatus(BotStatus.CONNECTED, data);
            });
        });

        this.socket.on("disconnect", () => {
            this.socket.removeAllListeners();
            // Check if first connection got refused
            if (this.status == BotStatus.CONNECTING) {
                // Auto reconnect
                setTimeout(()=>{
                    this.connect(roomCode, url);
                },10000);
            }else{
                this.setStatus(BotStatus.DISCONNECTED);
            }
        });

        // Bot get ban (mostly)
        // TODO: Handle kick reasons
        this.socket.on("kicked", (reason: any) => {
            console.log(reason);
            
            if (this.status == BotStatus.ACTIVE) {
                this.stop();
            }
            this.socket.close();
            this.setStatus(BotStatus.BANNED);
        });

        this.socket.on("connect_error", (err: any) => {
            this.setStatus(BotStatus.DISCONNECTED);
            console.log(err);
            // Auto reconnect
            this.connect(roomCode, url);
        });
    }

    disconnect() { 
        try {
            if (this.socket) this.socket.close(); 
        } catch (error) { }
    }

    start() { this.setStatus(BotStatus.ACTIVE); }

    stop() { this.setStatus(BotStatus.STOPPED); }
}