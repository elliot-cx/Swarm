import { Bot, BotStatus, BotType } from './Bot'

export default class ResponderBot extends Bot {
   type: BotType
   delay: number

   constructor(name: string, delay: number) {
      super(name)
      this.delay = delay
      this.proxy = true
      this.type = BotType.RESPONDER
   }

   toJSON() {
      const { socket, timeouts, ...json } = this
      return json
   }

   onStatusChanged(status: BotStatus, data?: any): void {
      switch (status) {
         case BotStatus.ACTIVE:
            this.socket.on('chat', (authProfile: any, message: string) => {
               // Check if the message is not a message sent by the bot himself
               if (authProfile.peerId != this.peerId) {
                  setTimeout(() => {
                     this.emit('chat', message)
                  }, this.delay)
               }
            })
            break
         default:
            try {
               this.socket.off('chat')
            } catch (error) {}
      }
   }
}
