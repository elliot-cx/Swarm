export interface RoomEntry {
   roomEntry : {
      roomCode: string,
      name: string,
      isPublic: boolean,
      gameId: "popsauce" | "bombparty" | "selector",
      playerCount: number,
      chatMode: "enabled" | "disabled" | "noGuests",
      beta: unknown,
      details: string
   },
   selfPeerId: number,
   selfRoles: [string],
   url: string
}