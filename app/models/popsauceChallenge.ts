export interface PopsauceStartChallenge {
   prompt: string
   text: string | null
   image: {
      type: string
      data: Buffer
   } | null
   endTime: number
}

export interface PopsauceEndChallenge {
   source: string
   submitter: string
   details: string
   fastest: string | null
   foundSourcesByPlayerPeerId: any
}
