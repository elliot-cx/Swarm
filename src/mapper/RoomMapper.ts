import { Bot } from "../models/Bot/Bot"
import { Room } from "../models/Room"
import { RoomDto } from "../models/dto/RoomDto"

export namespace RoomMapper {

    export const isRoomData = (roomDto:any): boolean => roomDto.id && roomDto.name  && roomDto.type  && roomDto.nbPlayers  && roomDto.isActive ;

    const deleteLinkField = (roomDto:RoomDto):Room => {
        delete roomDto.link;
        return roomDto;
    };

    // Return roomDto[0] if isArray else return roomDto
    export const getRoomDoFromDto = (roomDto: RoomDto ): Room =>{
    if((roomDto as any).success){
        roomDto = (roomDto as any).success;
    }
    return deleteLinkField(roomDto as RoomDto)};
}

