import { Room } from "../room";

export namespace RoomMapper {
    export const getDtoFromJKLMRoomResponse = (res: any): Room => {
        return({
            id: res.roomCode as string,
            name: res.name as string,
            type: res.gameId as string,
            nbPlayers: res.playerCount as number,
            isActive: false,
            link:'',
            bots: []
        })
    }
}