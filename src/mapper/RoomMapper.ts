/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
import { Room } from '../models/Room';
import { RoomDto } from '../models/dto/RoomDto';

export module RoomMapper {

    export const isRoomData = (roomDto: any): boolean => roomDto.id && roomDto.name  && roomDto.type  && roomDto.nbPlayers  && roomDto.isActive ;

    const deleteLinkField = (roomDto: RoomDto):Room => {
        delete roomDto.link;
        return roomDto;
    };

    // Return roomDto[0] if isArray else return roomDto
    export const getRoomDoFromDto = (roomDto: RoomDto ): Room =>{
        // Get the 'real data' if it has been wrapped in a 'success' field
        if((roomDto as any).success){
            roomDto = (roomDto as any).success;
        }
        // Delete the unwanted link field
        return deleteLinkField(roomDto as RoomDto);
    };

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

