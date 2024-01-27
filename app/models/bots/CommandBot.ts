import { chatterProfile } from "../chatterProfile";
import { Bot, BotStatus, BotType } from "./Bot";
import { readdirSync } from "fs";

export default class CommandBot extends Bot {

    type: BotType;
    isMod: boolean;
    jail: string[];

    constructor(name: string) {
        super(name);
        this.type = BotType.COMMAND;
        this.isMod = false;
        this.jail = [];
    }

    toJSON() {
        const { socket, jail, ...json } = this;
        return json;
    }

    onStatusChanged(status: BotStatus, data?: any): void {
        switch (status) {
            case BotStatus.CONNECTED:
                this.isMod = data.selfRoles.length > 0;
                if (!this.isMod) {
                    this.emit("chat", "Mets moi modo chacal stp");
                }
                // Check si il passe mod
                this.socket.on("setSelfRoles", (roles: string[]) => {
                    this.isMod = roles.length > 0;
                    if (this.isMod) {
                        this.emit("chat", "Merci pélo");
                    } else {
                        this.emit("chat", "Sale batard remets moi mod");
                    }
                });
                break;
            case BotStatus.ACTIVE:
                // Quand un message est envoyé on traite la commande
                this.socket.on("chat", (authProfile: chatterProfile, message: string) => {
                    this.handleCommand(authProfile, message);
                    this.handleJail(authProfile, message);
                });
                break;
            default:
                try {
                    this.socket.off("chat");
                    this.socket.off("setSelfRoles");
                } catch (error) { }
        }
    }

    handleCommand(authProfile: chatterProfile, message: string): void {
        this.emit("getChatterProfiles", (chatterProfiles: chatterProfile[]) => {
            if(message.startsWith("/") && authProfile.peerId !== this.peerId) {
                if(authProfile.roles.length === 0 && authProfile.nickname !== "MBAPPE" && authProfile.nickname !== "BERNARDO GUY") return this.emit("chat", "T'es pas mod sale fdp");
                const args = message.split(" ");
                const command = args.shift()?.replace("/", "");
                const commands = readdirSync("./app/models/bots/commands/");
                if(!commands.includes(command as string + ".ts")) return this.emit("chat", `Je connais pas cette commande frérot`);
                const file = require(`./commands/${command}`).default;
                if(file.needMod && (chatterProfiles.find(c => c.peerId === this.peerId) as chatterProfile).roles.length < 1) return this.emit("chat", "Faut que je sois mod imbécile va");
                file.run(this, authProfile, args);
            };
        });
    };

    handleJail(authProfile: chatterProfile, message: string): void {
        if (this.jail.includes(authProfile.nickname)) {
            if (!this.isMod) {
                this.emit("chat", "Je suis plus modo enculé, je peux pas le foutre en prison ce pd");
                return;
            }
            if (authProfile.roles.length == 0) {
                this.emit("chat", "Je t'avais prévenu petite salope");
                this.emit("setUserBanned", authProfile.peerId, true, (res: any) => {
                    this.emit("setUserBanned", authProfile.peerId, false, (res: any) => { });
                });
            };
        };
    };
}