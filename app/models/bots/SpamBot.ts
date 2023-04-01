import { Bot, BotStatus } from "./Bot";

export default class SpamBot extends Bot{

    interval: NodeJS.Timer | null;
    message: string;

    constructor(name:string, message: string){
        super(name);
        this.message = message;
        this.interval = null;
    }
    
    toJSON(){
        const {socket,interval, ...json} = this;
        return json;
    }

    onStatusChanged(status: BotStatus, data?: any): void {
        switch (status) {
            case BotStatus.ACTIVE:
                this.interval = setInterval(()=>{
                    this.socket.emit("chat",this.message);
                },1100);
                break;
            default:
                if (this.interval) {
                    clearInterval(this.interval);
                    this.interval = null;
                }
                break;
        }
    }
}