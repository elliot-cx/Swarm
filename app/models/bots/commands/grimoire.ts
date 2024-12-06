import { DataService } from '../../../services/data'
import { chatterProfile } from '../../chatterProfile'
import CommandBot from '../CommandBot'

export default {
   needMod: false,
   run(bot: CommandBot, authProfile: chatterProfile, args: string[]) {
      switch (args[0]) {
         case 'set':
            const debitage = args.slice(1).join(' ')
            if (!debitage) return bot.emit('chat', `T'as oublié ton poème gros`)

            const grimoire = DataService.getDataInstance('grimoire')
            if (!grimoire.debitage) {
               grimoire.debitage = [debitage]
            } else {
               if (grimoire.debitage.find((e: string) => e === debitage))
                  return bot.emit(
                     'chat',
                     `Ce texte est déjà enregistré dans le grimoire enchanté`
                  )
               grimoire.debitage.push(debitage)
            }
            bot.emit(
               'chat',
               `Et un texte de plus que j'enregistre pour que tu puisses continuer de régner sur ce jeu de fdp`
            )
            DataService.updateDataInstance('grimoire', grimoire)
            break
         case 'get':
            const name = args[1]
            const search = args.slice(2).join(' ')

            const grimoireGet = DataService.getDataInstance('grimoire')

            if (!grimoireGet.debitage)
               return bot.emit(
                  'chat',
                  `Y a aucun poème dans le grimoire pour le moment`
               )
            const found = grimoireGet.debitage
               .find((e: string) =>
                  e.toLowerCase().includes(search.toLocaleLowerCase())
               )
               .replace(/{name}/g, name)
            bot.emit('chat', found)
            break
      }
   },
}
