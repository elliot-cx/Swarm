import { chatterProfile } from "../../chatterProfile";
import CommandBot from "../CommandBot";

export default {

    needMod: true,
    run(bot: CommandBot) {
        bot.emit("getChatterProfiles", (chatterProfiles: chatterProfile[]) => {
            const bannable = chatterProfiles.filter((chatter: chatterProfile) => chatter.roles.length == 0);
            if (bannable.length > 0) {
                const banned = bannable[Math.floor(Math.random() * bannable.length)];
                // Ban
                bot.emit("setUserBanned", banned.peerId, true, (res: any) => { });
                bot.emit("chat", `mskn ${banned.nickname} s'est fait ban comme une salope`);
            } else {
                bot.emit("chat", `Y a pas de ptites soumises à ban`);
            }
        });
    }
};