import { Room } from "../room";

export namespace RoomMapper {
    export const getDtoFromJKLMRoomResponse = (res: any): Room[] => {
        const rooms: Room[] = [];
        if(res.publicRooms){
            res.publicRooms.forEach((room: any) => {
                rooms.push({
                    id: room.roomCode as string,
                    name: room.name as string,
                    type: room.gameId as string,
                    nbPlayers: room.playerCount as number,
                    isActive: false,
                    link:'',
                    bots: []
                });
            });
        }
        return rooms;
    }
}