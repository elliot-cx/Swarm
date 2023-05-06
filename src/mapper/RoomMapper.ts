/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
import { Room } from '../models/Room';
import { PostRoomData } from '../models/dto/RoomResponse.model';

export module RoomMapper {

    export const isRoomData = (roomDto: any ): boolean => roomDto.id && roomDto.name  && roomDto.type  && roomDto.nbPlayers  && roomDto.isActive ;

    export const getRoomDoFromRoomDto = (roomDto: PostRoomData): Room => {
        const room: any = roomDto as any;
        room.isActive = false;
        return room as Room; 
    };

    export const getRoomDoFromRoomDtoList = (roomDtoList: PostRoomData[]): Room[] => roomDtoList.map((roomDto: PostRoomData) => getRoomDoFromRoomDto(roomDto));

    // Convert room objects sent by KJKLM into usable DO objects
    export const getRoomDoFromDtoJKLM = (roomDto: any): Room => ({
        id: roomDto.roomCode,
        name: roomDto.name,
        type: roomDto.gameId,
        nbPlayers: roomDto.playerCount,
        isActive: false,
        bots: []
    });
}

