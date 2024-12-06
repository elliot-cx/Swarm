import { chatterProfile } from '../../chatterProfile'
import CommandBot from '../CommandBot'

export default {
   needMod: true,
   run(bot: CommandBot) {
      bot.emit('getChatterProfiles', (chatterProfiles: chatterProfile[]) => {
         const unbannable = chatterProfiles.filter((chatter: chatterProfile) =>
            chatter.roles.includes('banned')
         )
         if (unbannable.length > 0) {
            unbannable.forEach((banned) => {
               bot.emit('setUserBanned', banned.peerId, false, (res: any) => {})
            })
            bot.emit(
               'chat',
               `C'est bon j'ai débanni toutes les salopes qui étaient ban`
            )
         } else {
            bot.emit('chat', `Y a pas de ptites soumises à ban`)
         }
      })
   },
}
