import { chatterProfile } from "../../chatterProfile";
import CommandBot from "../CommandBot";

export default {

    needMod: true,
    run(bot: CommandBot, authProfile: chatterProfile, args: string[]) {
        bot.emit("getChatterProfiles", (chatterProfiles: chatterProfile[]) => {
            const user: chatterProfile | undefined = chatterProfiles.find((chatter: chatterProfile) => chatter.nickname == args.slice(0).join(" ") || chatter.peerId === parseInt(args[0]));
            if(user) {
                if(user.roles.length > 0) return bot.emit(`chat", "Désolé je peux pas mettre en prison ${user.nickname}`);
                if(bot.jail.includes(user.nickname)) {
                    bot.jail = bot.jail.filter((nickname: string) => nickname != user.nickname);
                    bot.emit("chat", `C'est bon j'ai libéré cette salope de ${user.nickname}`);
                } else {
                    bot.jail.push(user.nickname);
                    bot.emit("chat", `J'ai mis cette sous race de ${user.nickname} en prison, il parle, il va se faire prendre par le cul ce pd`);
                }
            } else {
                bot.emit("chat", "Tu te fous de ma geule là ? Je connais pas ce petit pd moi");
            };
        });
    }
};