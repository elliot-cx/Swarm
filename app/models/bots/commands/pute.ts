import { chatterProfile } from '../../chatterProfile'
import CommandBot from '../CommandBot'

export default {
   needMod: false,
   run(bot: CommandBot) {
      bot.emit('getChatterProfiles', (chatterProfiles: chatterProfile[]) => {
         const chatters = chatterProfiles.filter(
            (chatter: chatterProfile) => chatter.roles.length == 0
         )
         if (chatters.length > 0) {
            const chatter =
               chatters[Math.floor(Math.random() * chatters.length)]
            bot.emit(
               'chat',
               `On m'annonce que ${chatter.nickname} est une grosse pute`
            )
         } else {
            bot.emit('chat', `Y a pas de ptites putes actuellement`)
         }
      })
   },
}
