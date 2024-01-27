export interface PopsauceSetup {
   serverNow: number;
   rules: {
      dictionaryId: {
         value: string;
         items: {
            value: string;
            label: string;
         }[];
      };
      scoreGoal: {
         value: number;
         min: number;
         max: number;
         step: number;
      };
      scoring: {
         value: string;
         items: string[];
      };
      challengeDuration: {
         value: number;
         min: number;
         max: number;
      };
      visibleGuesses: {
         value: boolean;
      };
      shorthands: {
         value: boolean;
      };
      tagOps: {
         op: string;
         tag: string;
      }[];
   };
   publicTags: string[];
   filteredQuoteCount: number;
   totalQuoteCount: number;
   constants: {
      maxPlayers: number;
      minPlayers: number;
      maxSourceLength: number;
      startTimerDuration: number;
      challengeResultDuration: number;
      submitRateLimit: {
         interval: number;
         max: number;
      };
   };
   milestone: {
      name: string;
      startTime: number | null;
      lastRound: {
         winner: {
            nickname: string;
            picture: string;
         };
      } | null;
      players: [];
      selfPeerId: number;
      selfRoles: string[];
      leaderPeerId: number;
      rulesLocked: boolean;
   };
};