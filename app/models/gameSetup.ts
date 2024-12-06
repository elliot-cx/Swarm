export interface PopsauceSetup {
   serverNow: number
   rules: {
      dictionaryId: {
         value: string
         items: {
            value: string
            label: string
         }[]
      }
      scoreGoal: {
         value: number
         min: number
         max: number
         step: number
      }
      scoring: {
         value: string
         items: string[]
      }
      challengeDuration: {
         value: number
         min: number
         max: number
      }
      visibleGuesses: {
         value: boolean
      }
      shorthands: {
         value: boolean
      }
      tagOps: {
         op: string
         tag: string
      }[]
   }
   publicTags: string[]
   filteredQuoteCount: number
   totalQuoteCount: number
   constants: {
      maxPlayers: number
      minPlayers: number
      maxSourceLength: number
      startTimerDuration: number
      challengeResultDuration: number
      submitRateLimit: {
         interval: number
         max: number
      }
   }
   milestone: {
      name: string
      startTime: number | null
      lastRound: {
         winner: {
            nickname: string
            picture: string
         }
      } | null
      players: []
      selfPeerId: number
      selfRoles: string[]
      leaderPeerId: number
      rulesLocked: boolean
   }
}

export interface BombpartySetup {
   serverNow: number
   rules: {
      dictionaryId: {
         value: string
         items: Array<{
            value: string
            label: string
         }>
      }
      minTurnDuration: {
         value: number
         min: number
         max: number
      }
      promptDifficulty: {
         value: string
         items: Array<{
            value: string
         }>
      }
      customPromptDifficulty: {
         value: number
         min: number
         max: number
         disallowZero: boolean
      }
      maxPromptAge: {
         value: number
         min: number
         max: number
      }
      startingLives: {
         value: number
         min: number
         max: number
      }
      maxLives: {
         value: number
         min: number
         max: number
      }
      customBonusAlphabet: {
         value: {
            a: number
            b: number
            c: number
            d: number
            e: number
            f: number
            g: number
            h: number
            i: number
            j: number
            k: number
            l: number
            m: number
            n: number
            o: number
            p: number
            q: number
            r: number
            s: number
            t: number
            u: number
            v: number
            w: number
            x: number
            y: number
            z: number
         }
         min: number
         max: number
      }
      maxPlayers: {
         value: number
         min: number
         max: number
      }
   }
   constants: {
      maxPlayers: number
      minPlayers: number
      maxWordLength: number
      startTimerDuration: number
      minBombDuration: number
      maxBombDuration: number
      submitRateLimit: {
         interval: number
         max: number
      }
   }
   milestone: {
      name: string
      rulesLocked: boolean
      dictionaryManifest: {
         name: string
         bonusAlphabet: {
            a: number
            b: number
            c: number
            d: number
            e: number
            f: number
            g: number
            h: number
            i: number
            j: number
            k: number
            l: number
            m: number
            n: number
            o: number
            p: number
            q: number
            r: number
            s: number
            t: number
            u: number
            v: number
            w: number
            x: number
            y: number
            z: number
         }
         promptDifficulties: {
            beginner: number
            medium: number
            hard: number
         }
      }
   }
   players: Array<any>
   selfPeerId: number
   selfRoles: Array<string>
   leaderPeerId: number
}
