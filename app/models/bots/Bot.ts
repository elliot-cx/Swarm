import { BotAuthentificationService } from "../../services/botAuthentification";
import { reCaptcha } from "../../services/reCaptcha";
import { SocketIOService } from "../../services/sockets";
import { Utils } from "../../utils/utils";
import { Authentification } from "../authentification";
import { HttpsProxyAgent } from "https-proxy-agent";
import chalk from 'chalk';
import { RoomEntry } from "../roomEntry";
import { Socket, io } from "socket.io-client";

export enum BotStatus {
    CONNECTING = "connecting",
    CONNECTED = "connected",
    BANNED = "banned",
    DISCONNECTED = "disconnected",
    ACTIVE = "active",
    STOPPED = "stop",
    DELETED = "deleted"
}

export enum BotAction {
    START = "start",
    STOP = "stop",
    DISCONNECT = "disconnect",
    CONNECT = "connect",
    DELETE = "deleted"
}

export enum BotType {
    SPAM = "spam",
    RESPONDER = "responder",
    TRACKER = "tracker",
    VIDEO = "video",
    COMMAND = "command",
    OSINT = "osint",
    POPSAUCE = "popsauce"
}

export function log(string: string) {
    console.log(chalk.red("[Bot]"), string);
}

export class Bot {
    id: string;
    socket: Socket;
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

    onStatusChanged(status: BotStatus, data?: RoomEntry) { }

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

    connect(roomCode: string, url: string, autoStart: boolean = false) {
        // Check if bot is active before connect
        if (this.status == (BotStatus.CONNECTED || BotStatus.ACTIVE)) return;

        this.roomCode = roomCode;
        this.token = Utils.randomString();
        this.setStatus(BotStatus.CONNECTING);
        // Here you can configure a proxy for ban avoiding (use a rotating proxy / residential for better results)
        const proxyUrl = process.env.PROXY;
        // const agent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : null;
        this.socket = io(url, {
            // agent: agent,
            transports :  ["websocket"]
        });
        // Handle sockets events
        this.socket.on("connect", async () => {
            const gcToken = await reCaptcha.resolveCaptcha();
            const joinData = {
                "roomCode": roomCode,
                "userToken": this.token,
                "nickname": this.name,
                "picture": null,
                "auth": BotAuthentificationService.getAuthentification(),
                "language": "fr-FR",
                "token": gcToken
            };
            this.socket.emit("joinRoom", joinData, (data: RoomEntry) => {
                this.peerId = data.selfPeerId; // To know the bot connexion id from JKLM server
                data.url = url;
                this.setStatus(BotStatus.CONNECTED, data);
                if (autoStart) {
                    this.start();
                }
            });
        });
        // Bot got disconnected
        this.socket.on("disconnect", (reason: string) => {
            this.socket.removeAllListeners();
            // Check if connection got refused or got disconnected
            if (reason != "io client disconnect") {
                setTimeout(()=>{
                    if (this.status !== BotStatus.DELETED) {
                        this.connect(roomCode, url)
                    }
                },10000);
            }
            if (this.status != BotStatus.CONNECTING) {
               this.setStatus(BotStatus.DISCONNECTED);
            }
        });
        // JKLM custom events (ban for exemple)
        this.socket.on("kicked", (reason: any) => {
            log("kicked : " + reason);
            const wasActive = this.status == BotStatus.ACTIVE;
            // First we stop the bot loop
            if (wasActive) this.stop();
            // We close the socket
            this.socket.close();
            // Check if it was a ban
            if (reason == "banned") {
                this.setStatus(BotStatus.BANNED);
                // Auto reconnect the bot when got ban (only works if proxy is active)
                // TODO: Check if proxy enabled
                this.connect(this.roomCode,url, wasActive);
            }
            // TODO: Handle other type of kicked
        });
        // Log connect error in case for debug
        this.socket.on("connect_error", (err: any) => {
            this.setStatus(BotStatus.DISCONNECTED);
            log(`The bot [${this.id}] | ${this.name} failed to connect : ${err}`);
            // Auto reconnect
            this.connect(roomCode, url);
        });
    }

    disconnect() { 
        try {
            if (this.socket) this.socket.close(); 
        } catch (error) { }
    }

    start() { 
        if (this.status == BotStatus.CONNECTED || this.status == BotStatus.STOPPED) {
            this.setStatus(BotStatus.ACTIVE); 
        }
    }

    stop() { 
        if (this.status == BotStatus.ACTIVE) {
            this.setStatus(BotStatus.STOPPED);
        }
    }

    onDelete() {
        this.status = BotStatus.DELETED;
    }
}