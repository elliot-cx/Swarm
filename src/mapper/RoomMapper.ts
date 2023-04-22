import { Bot } from "../models/Bot/Bot"
import { Room } from "../models/Room"
import { RoomDto } from "../models/dto/RoomDto"

export namespace RoomMapper {
    export const getDoFromDtoRoom = (dtoRoom: RoomDto): Room => {
        // Transforms room data sent by the api to room data used by the app
        return {
            id:dtoRoom.id, 
            name:dtoRoom.name, 
            type:dtoRoom.type, 
            nbPlayers:dtoRoom.nbPlayers, 
            isActive:dtoRoom.isActive, 
            bots: dtoRoom.bots}
    }

}

