import { Bot, BotStatus } from './Bot';
import { Utils } from '../../utils/utils';
import { Sockets } from '../../sockets/sockets';

export default class SpamBot implements Bot {
    socket: any;
    type: string;
    name: string;
    status: BotStatus;
    token: string;
    interval: NodeJS.Timer | null;
    message: string;

    private roomCode: string;

    constructor(name: string, message: string) {
        this.socket = require('socket.io-client');
        this.type = "spam";
        this.token =  Utils.randomString();
        this.name = name;
        this.status = BotStatus.DISCONNECTED;
        this.interval = null;
        this.message = message;
    }

    // Change la façon dont l'objet est parsé en JSON
    // Ici on veut exclure des propriétés qui ne doivent pas être renvoyées par l'API
    toJSON() {
        const {socket, interval, ...json} = this;
        return json;
    }

    setStatus(status: BotStatus) {
        this.status = status;
        Sockets.emitRoom(this.roomCode,"status",this.status);
    }

    connect(roomCode: string,url: string){
        this.socket = this.socket.connect(url);

        const joinData = {
            "roomCode": roomCode,
            "userToken": this.token,
            "nickname": this.name,
            "language": "fr-FR"
        };

        this.socket.on("connect",()=>{
            this.socket.emit("joinRoom", joinData, (data:any) => {
                this.setStatus(BotStatus.CONNECTED);
            });
        });

        this.socket.on("disconnect",()=>{
            if (this.status == BotStatus.ACTIVE) {
                this.stop();
            }
            this.socket.close();
            this.setStatus(BotStatus.DISCONNECTED);
        });

        // Bot get ban (mostly)
        this.socket.on("kicked",(reason: any)=>{
            if (this.status == BotStatus.ACTIVE) {
                this.stop();
            }
            this.socket.close();
            this.setStatus(BotStatus.BANNED);
        });

        this.socket.on("chat", (authProfile: any, message: string) => {
            console.log(message);
        });
        
        this.socket.on("connect_error",(err:any)=>{
            this.setStatus(BotStatus.DISCONNECTED);
            // Auto reconnect
            this.connect(roomCode,url);
        })
    }

    disconnect() {
        this.socket.close();
    }

    start() {
        this.setStatus(BotStatus.ACTIVE);
        this.interval = setInterval(()=>{
            this.socket.emit("chat",this.message);
        },1100);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
            this.setStatus(BotStatus.CONNECTED);
        }
    }
}