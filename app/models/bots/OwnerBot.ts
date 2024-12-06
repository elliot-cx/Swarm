import { env } from 'process'
import { chatterProfile } from '../chatterProfile'
import { Bot, BotStatus, BotType, log } from './Bot'

export default class OwnerBot extends Bot {
   type: BotType
   isLeader: boolean
   password: string

   constructor(name: string) {
      super(name)
      this.type = BotType.OWNER
      this.isLeader = false
      this.password = ''
      this.generatePassword()
   }

   toJSON() {
      const { socket, ...json } = this
      return json
   }

   onStatusChanged(status: BotStatus, data?: any): void {
      switch (status) {
         case BotStatus.CONNECTED:
            // Check si il passe owner
            this.socket.on('setSelfRoles', (roles: string[]) => {
               if (roles.find((role) => role == 'leader')) {
                  this.isLeader = true
                  this.sendWebhook(`Role leader récupéré dans la salle : https://jklm.fun/${this.roomCode}`);
               } else {
                  this.isLeader = false
               }
            })
            break
         case BotStatus.ACTIVE:
            // Quand un message est envoyé on traite la commande
            this.socket.on(
               'chat',
               (authProfile: chatterProfile, message: string) => {
                  if (message == this.password) {
                     if (this.isLeader) {
                        this.emit('setUserLeader', authProfile.peerId, (res: any) =>{
                           if (!res.errorCode){
                              this.emit('chat', 'Bienvenu seigneur');
                              this.generatePassword();
                           }
                        });
                     }
                  }
               }
            )
            break
         default:
            try {
               this.socket.off('chat')
               this.socket.off('setSelfRoles')
            } catch (error) {}
            break
      }
   }

   generatePassword() {
      const password = Array.from({ length: 12 }, () =>
         'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}'.charAt(
            Math.floor(Math.random() * 74)
         )
      ).join('')
      this.password = password
   }

   sendWebhook(message: string) {
      const webhookURL: string = env.WEBHOOK!;
      const wcontent = {
         content: message,
         username: this.name,
         // avatar_url: 'https://example.com/avatar.png',
      }

      fetch(webhookURL, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(wcontent),
      })
         .then((res) => {
            if (res.ok) {
               log('Message envoyé avec succès !')
            } else {
               log("Erreur lors de l'envoie du webhook")
            }
         })
         .catch((err) => log(`Erreur lors de l'envoie du webhook : ${err}`))
   }
}
