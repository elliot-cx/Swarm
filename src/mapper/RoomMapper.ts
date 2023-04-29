import { Bot } from "../models/Bot/Bot"
import { Room } from "../models/Room"
import { RoomDto } from "../models/dto/RoomDto"

export namespace RoomMapper {

    const isArray = (obj: any): boolean => obj[0] ? true : false;

    export const isRoomData = (roomDto:any): boolean => roomDto.id && roomDto.name  && roomDto.type  && roomDto.nbPlayers  && roomDto.isActive ;

    const deleteLinkField = (roomDto:RoomDto):Room => {
        delete roomDto.link;
        return roomDto;
    };

    // Return roomDto[0] if isArray else return roomDto
    export const getRoomDoFromDto = (roomDto: RoomDto | RoomDto[]): Room =>  isArray(roomDto) ? (roomDto as RoomDto[])[0] : deleteLinkField(roomDto as RoomDto);

}

