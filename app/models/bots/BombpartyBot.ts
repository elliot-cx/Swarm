import { io, Socket } from 'socket.io-client'
import { Bot, BotStatus, BotType, log } from './Bot'
import { DataService } from '../../services/data'
import { RoomEntry } from '../roomEntry'
import { BombpartySetup } from '../gameSetup'

export default class BombpartyBot extends Bot {
   type: BotType
   socketGame: Socket
   dictionnaryLang: string
   usedWords: string[]
   currentPeerId: number
   lastWord: string

   constructor(name: string) {
      super(name)
      this.socketGame = io()
      this.dictionnaryLang = 'fr'
      this.usedWords = []
      this.currentPeerId = -1
      this.lastWord = ''
      this.answers = DataService.getDataInstance('bombparty')
      this.proxy = false
      this.type = BotType.BOMBPARTY
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
            this.socketGame.off('setPlayerWord')
            this.socketGame.off('correctWord')
            break
      }
   }

   addGameListeners() {
      this.socketGame.on('setup', (data: BombpartySetup) => {
         this.dictionnaryLang = data.rules.dictionaryId.value
      })

      this.socketGame.on('clearUsedWords', () => {
         this.usedWords = []
      })

      this.socketGame.on('setMilestone', (milestone) => {
         if (this.status == BotStatus.ACTIVE) {
            this.socketGame.emit('joinRound')
         }

         this.currentPeerId = milestone.currentPlayerPeerId
         if (this.currentPeerId == this.peerId && BotStatus.ACTIVE) {
            this.sendWord(milestone.syllable, this.dictionnaryLang)
         }
      })

      this.socketGame.on('setPlayerWord', (peerId: number, word: string) => {
         this.currentPeerId = peerId
         this.lastWord = word
      })

      this.socketGame.on(
         'correctWord',
         (peerId: number, bonusAlphabet: any) => {
            this.usedWords.push(this.lastWord)
            if (peerId != this.peerId) {
               this.tryAddWord(this.lastWord, this.dictionnaryLang)
            }
         }
      )

      this.socketGame.on('nextTurn', (peerId: number, syl: string) => {
         if (peerId == this.peerId && BotStatus.ACTIVE) {
            this.sendWord(syl, this.dictionnaryLang)
         }
      })
   }

   private sendWord(syl: string, lang: string) {
      const words = DataService.getDataInstance('bombparty')
      const word = (words[lang] as Array<string>).find(
         (w) => w.includes(syl) && !this.usedWords.includes(w)
      )
      if (word) {
         this.humanType(word)
         // this.socketGame.emit('setWord', word, true)
      } else {
         log(`Pas de mot pour la syl ${syl}`)
      }
   }

   private tryAddWord(word: string, lang: string) {
      const words = DataService.getDataInstance('bombparty')
      words[lang] = words[lang] ?? []
      if (!(words[lang] as Array<string>).includes(word)) {
         words[lang].push(word)
      }
      DataService.updateDataInstance('bombparty', words)
   }

   private async humanType(word: string) {
      const delay = (ms: number) =>
         new Promise((resolve) => setTimeout(resolve, ms))
      let currentWord = '' // Mot actuel construit au fur et à mesure
      await delay(1000 + Math.random() * 1000) // Attente entre les lettres

      for (let i = 0; i < word.length; i++) {
         const isLastLetter = i === word.length - 1
         const correctLetter = word[i]

         // Probabilité d'erreur
         if (Math.random() < 0.15) {
            const randomChar = String.fromCharCode(
               97 + Math.floor(Math.random() * 26)
            ) // Lettre aléatoire (a-z)

            // Ajouter la mauvaise lettre
            currentWord += randomChar
            this.socketGame.emit('setWord', currentWord, false)
            await delay(40 + Math.random() * 120) // Attente entre les lettres

            // Supprimer la lettre incorrecte
            currentWord = currentWord.slice(0, -1)
            this.socketGame.emit('setWord', currentWord, false)
            await delay(40 + Math.random() * 120) // Attente entre les lettres
         }

         // Ajouter la bonne lettre
         currentWord += correctLetter
         this.socketGame.emit('setWord', currentWord, isLastLetter)
         await delay(50 + Math.random() * 120) // Attente entre les lettres
      }
   }
}
