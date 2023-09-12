import { chatterProfile } from "../chatterProfile";
import { Bot, BotStatus, BotType, log } from "./Bot";

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

    // this.emit("chat", message);

    onStatusChanged(status: BotStatus, data?: any): void {
        switch (status) {
            case BotStatus.CONNECTED:
                this.isMod = data.selfRoles.length > 0;
                if (!this.isMod) {
                    this.emit("chat", "Mets moi mod chacal stp");
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
        // Check command
        if (message.startsWith("/") && authProfile.peerId != this.peerId) {
            // Check auteur + perm
            if (authProfile.roles.length == 0) {
                this.emit("chat", "T pas mod sale fdp");
                return;
            }
            const args = message.split(" ");
            // Liste des commandes
            if (message.startsWith("/roulette")) {
                this.emit("getChatterProfiles", (chatterProfiles: chatterProfile[]) => {
                    const bannable = chatterProfiles.filter((chatter: chatterProfile) => chatter.roles.length == 0);
                    if (bannable.length > 0) {
                        const banned = bannable[Math.floor(Math.random() * bannable.length)];
                        // Ban
                        this.emit("setUserBanned", banned.peerId, true, (res: any) => { });
                        this.emit("chat", `mskn ${banned.nickname} s'est fait ban comme une salope`);
                    } else {
                        this.emit("chat", `Ya pas de ptites soumises à ban`);
                    }
                });
            } else if (message.startsWith("/prison")) {
                if (args.length < 2) {
                    // Pas le bon nombre d'arguments
                    this.emit(`chat","ta oublié de me donner le blaze au lépreux que je dois mettre en prison`);
                    return;
                }
                this.emit("getChatterProfiles", (chatterProfiles: chatterProfile[]) => {
                    const user: chatterProfile | undefined = chatterProfiles.find((chatter: chatterProfile) => chatter.nickname == args[1]);
                    if (user) {
                        if (user.roles.length > 0) {
                            this.emit(`chat","désolé je peux pas mettre en prison ${user.nickname}`);
                        } else {
                            if (this.jail.includes(user.nickname)) {
                                this.jail = this.jail.filter((nickname: string) => nickname != user.nickname);
                                this.emit("chat", `C'est bon j'ai libéré cette salope de ${user.nickname}`);
                            } else {
                                this.jail.push(user.nickname);
                                this.emit("chat", `J'ai mis cette sous race de ${user.nickname} en prison, il parle, il va se faire prendre par le cul ce pd`);
                            }
                        }
                    } else {
                        this.emit("chat", "tu te fou de ma geule là ? je connais pas ce petit pd moi");
                    }
                });
            } else if (message.startsWith("/pute")) {
                this.emit("getChatterProfiles", (chatterProfiles: chatterProfile[]) => {
                    const bannable = chatterProfiles.filter((chatter: chatterProfile) => chatter.roles.length == 0);
                    if (bannable.length > 0) {
                        const chatter = bannable[Math.floor(Math.random() * bannable.length)];
                        this.emit("chat", `On m'annonce que ${chatter.nickname} est une grosse pute`);
                    } else {
                        this.emit("chat", `Ya pas de ptites putes actuellements`);
                    }
                });
            } else {
                this.emit("chat", "Je connais pas cette commande frérot");
            }
        }
    }

    handleJail(authProfile: chatterProfile, message: string): void {
        if (this.jail.includes(authProfile.nickname)) {
            if (!this.isMod) {
                this.emit("chat", "je suis plus modo enculé, je peux pas le foutre en prison ce pd");
                return;
            }
            if (authProfile.roles.length == 0) {
                this.emit("chat", "je t'avais prévenu petite salope");
                this.emit("setUserBanned", authProfile.peerId, true, (res: any) => {
                    this.emit("setUserBanned", authProfile.peerId, false, (res: any) => { });
                });
            }

        }
    }
}