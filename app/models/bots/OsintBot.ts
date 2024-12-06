import { DataService } from '../../services/data'
import { chatterProfile } from '../chatterProfile'
import { Bot, BotStatus, BotType } from './Bot'

export default class OsintBot extends Bot {
   type: BotType
   peerTracking: number
   data: any
   messages: any[]

   constructor(name: string, peerId: number) {
      super(name)
      this.type = BotType.OSINT
      this.peerTracking = peerId
      this.data = DataService.getDataInstance('osint')
      this.messages = []
   }

   toJSON() {
      const { socket, timeouts, data, messages, ...json } = this
      return json
   }

   onStatusChanged(status: BotStatus, data?: any): void {
      switch (status) {
         case BotStatus.ACTIVE:
            this.socket.on(
               'chat',
               (authProfile: chatterProfile, message: string) => {
                  if (authProfile.peerId == this.peerTracking) {
                     this.messages.push({
                        date: Date.now(),
                        content: message,
                     })
                     this.data[authProfile.nickname] = {
                        ...authProfile,
                        messages: this.messages,
                     }
                     DataService.updateDataInstance('osint', this.data)
                  }
               }
            )
            break
         default:
            try {
               this.socket.off('chat')
            } catch (error) {}
            break
      }
   }
}
