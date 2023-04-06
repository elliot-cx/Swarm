import { Bot, BotType } from "./Bot";

export default class ResponderBot extends Bot {

    type: BotType;

    constructor(name: string){
        super(name);
        this.type = BotType.RESPONDER;
    }

    toJSON() {
        const { socket, ...json } = this;
        return json;
    }
    
}