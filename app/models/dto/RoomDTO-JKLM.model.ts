export type RoomJKLMDtoModel = {
    roomCode: string,
    name: string,
    isPublic: boolean,
    gameId:string,
    playerCount: number,
    beta: unknown, // need testing with beta game
    details:string
}

export type JKLMRoomListModel = {
    publicRooms: RoomJKLMDtoModel []
}