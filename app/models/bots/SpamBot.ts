import { Bot, BotStatus } from './Bot';
import { Utils } from '../../utils/utils';

export default class SpamBot implements Bot {
    io: any;
    type: string;
    name: string;
    status: BotStatus;
    token: string;
    interval: NodeJS.Timer | null;
    message: string;

    constructor(name: string, message: string) {
        this.io = require('socket.io-client');
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
        const {io, interval, ...json} = this;
        return json;
    }

    setStatus(status: BotStatus) {
        this.status = status;
    }

    connect(roomCode: string,url: string){
        this.io = this.io.connect(url);

        const joinData = {
            "roomCode": roomCode,
            "userToken": this.token,
            "nickname": this.name,
            "language": "fr-FR"
        };

        this.io.on("connect",()=>{
            this.io.emit("joinRoom", joinData, (data:any) => {
                this.status = BotStatus.CONNECTED;
            });
        });

        this.io.on("disconnect",()=>{
            if (this.status == BotStatus.ACTIVE) {
                this.stop();
            }
            this.io.close();
            this.status = BotStatus.DISCONNECTED;
        });

        // Bot get ban (mostly)
        this.io.on("kicked",(reason: any)=>{
            if (this.status == BotStatus.ACTIVE) {
                this.stop();
            }
            this.io.close();
            this.status = BotStatus.BANNED;
        });

        this.io.on("chat", (authProfile: any, message: string) => {
            console.log(message);
        });
        
        this.io.on("connect_error",(err:any)=>{
            this.status = BotStatus.DISCONNECTED;
        })
    }

    disconnect() {
        if (this.io.connected) {
            this.io.close();
            this.setStatus(BotStatus.DISCONNECTED);
        }
    }

    start() {
        this.status = BotStatus.ACTIVE;
        this.interval = setInterval(()=>{
            this.io.emit("chat",this.message);
        },1100);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
            this.status = BotStatus.CONNECTED;
        }
    }
}