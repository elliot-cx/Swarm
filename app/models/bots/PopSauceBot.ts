import { RoomEntry } from '../roomEntry'
import { PopsauceSetup } from '../gameSetup'
import {
   PopsauceStartChallenge,
   PopsauceEndChallenge,
} from '../popsauceChallenge'
import { Bot, BotStatus, BotType } from './Bot'
import { Socket, io } from 'socket.io-client'
import { sha256 } from 'js-sha256'
import { DataService } from '../../services/data'

export default class PopSauceBot extends Bot {
   type: BotType
   socketGame: Socket
   dictionnaryLang: string
   hash: string

   constructor(name: string) {
      super(name)
      this.socketGame = io()
      this.dictionnaryLang = 'fr'
      this.answers = DataService.getDataInstance('popsauce')
      this.hash = ''
      this.type = BotType.POPSAUCE
   }

   toJSON() {
      const { socket, socketGame, ...json } = this
      return json
   }

   onStatusChanged(status: BotStatus, data?: RoomEntry): void {
      switch (status) {
         case BotStatus.CONNECTED:
            const roomData = data!
            const roomEntry = roomData.roomEntry

            this.socketGame = io(roomData.url, {
               // agent: agent,
               transports: ['websocket'],
            })

            this.addGameListeners()
            this.socketGame.on('connect', () => {
               this.socketGame.emit(
                  'joinGame',
                  roomEntry.gameId,
                  this.roomCode,
                  this.token
               )
               if (this.status == BotStatus.ACTIVE) {
                  this.socketGame.emit('joinRound')
               }
            })
            break
         case BotStatus.ACTIVE:
            this.socketGame.emit('joinRound')
            break
         case BotStatus.STOPPED:
            this.socketGame.emit('leaveRound')
            break
         case BotStatus.DISCONNECTED:
            this.socketGame.disconnect()
            this.socketGame.off('connect')
            this.socketGame.off('setup')
            this.socketGame.off('setMilestone')
            this.socketGame.off('startChallenge')
            this.socketGame.off('endChallenge')
            break
      }
   }

   addGameListeners() {
      this.socketGame.on('setup', (data: PopsauceSetup) => {
         this.dictionnaryLang = data.rules.dictionaryId.value
         const answers = DataService.getDataInstance('popsauce')
         if (!answers[this.dictionnaryLang]) {
            answers[this.dictionnaryLang] = {}
            DataService.updateDataInstance('popsauce', answers)
         }
      })

      this.socketGame.on('setMilestone', () => {
         if (this.status == BotStatus.ACTIVE) {
            this.socketGame.emit('joinRound')
         }
      })

      this.socketGame.on(
         'startChallenge',
         (challenge: PopsauceStartChallenge) => {
            this.hash = challenge.image
               ? sha256(challenge.image.data)
               : sha256(challenge.text!)
            const answer = this.getAnswer()
            if (answer && this.status == BotStatus.ACTIVE) {
               setTimeout(() => {
                  this.socketGame.emit('submitGuess', answer)
               }, Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000)
            }
         }
      )

      this.socketGame.on('endChallenge', (challenge: PopsauceEndChallenge) => {
         const answers = DataService.getDataInstance('popsauce')
         answers[this.dictionnaryLang][this.hash] = challenge.source
         DataService.updateDataInstance('popsauce', answers)
      })

      this.socket.on('chat', (authProfile: any, message: string) => {
         // Check if the message is not a message sent by the bot himself
         if (authProfile.peerId != this.peerId) {
            if (message.startsWith('/help')) {
               const answer = this.getAnswer()
               if (answer) {
                  this.emit('chat', answer)
               } else {
                  this.emit('chat', "J'ai pas désolé fréro :(")
               }
            }
         }
      })
   }

   private getAnswer() {
      const answer =
         DataService.getDataInstance('popsauce')[this.dictionnaryLang][
            this.hash
         ]
      return answer
   }
}
