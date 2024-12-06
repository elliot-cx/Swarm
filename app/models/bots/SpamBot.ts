import { Bot, BotStatus, BotType } from './Bot'

export default class SpamBot extends Bot {
   type: BotType
   interval: NodeJS.Timeout | null
   message: string

   constructor(name: string, message: string) {
      super(name)
      this.message = message
      this.interval = null
      this.proxy = true
      this.type = BotType.SPAM
   }

   toJSON() {
      const { socket, interval, timeouts, ...json } = this
      return json
   }

   onStatusChanged(status: BotStatus, data?: any): void {
      switch (status) {
         case BotStatus.ACTIVE:
            this.interval = setInterval(() => {
               this.emit('chat', this.message)
            }, 1200)
            break
         default:
            if (this.interval) {
               clearInterval(this.interval)
               this.interval = null
            }
            break
      }
   }
}
