import { Bot, BotStatus } from './Bot';
import { Utils } from '../../utils';

export default class SpamBot implements Bot {
    io: any;
    type: string;
    name: string;
    status: BotStatus;
    token: string;
    interval: NodeJS.Timer | null;

    constructor(name: string) {
        this.io = require('socket.io-client');
        this.type = "spam";
        this.token =  Utils.randomString();
        this.name = name;
        this.status = BotStatus.DISCONNECTED;
        this.interval = null;
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
        })

        this.io.on("chat", (authProfile: any, message: string) => {
            console.log(message);
        });
        
        this.io.on("connect_error",(err:any)=>{
            console.log(err)
        })
    }

    start() {
        console.log("OKAY");
    }
}