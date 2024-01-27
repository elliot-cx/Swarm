import { chatterProfile } from "../../chatterProfile";
import CommandBot from "../CommandBot";

export default {

    needMod: true,
    run(bot: CommandBot, authProfile: chatterProfile) {
        bot.emit("getChatterProfiles", (chatterProfiles: chatterProfile[]) => {
            const bannable = chatterProfiles.filter((chatter: chatterProfile) => chatter.roles.length === 0 && chatter.peerId !== bot.peerId && chatter.peerId !== authProfile.peerId);
            if (bannable.length > 0) {
                bannable.forEach(banned => {
                    bot.emit("setUserBanned", banned.peerId, true, (res: any) => { });
                });
                bot.emit("chat", `HAHAHAHAHAH j'ai ban toute la game t'es le dieu mtn`);
            } else {
                bot.emit("chat", `Y a pas de ptites soumises à ban`);
            };
        });
    }
};