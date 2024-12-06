import { Bot } from './bots/Bot'

export interface Room {
   id: string
   name: string
   type: string
   nbPlayers: number
   isActive: boolean
   link: string
   bots: Bot[]
}
