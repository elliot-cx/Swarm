import { Bot } from "../models/Bot/Bot"
import { Room } from "../models/Room"
import { RoomDto } from "../models/dto/RoomDto"

export namespace RoomMapper {
    export const getRoomDoFromDto = (dtoRoom: RoomDto): Room => {
        // Transforms room data sent by the api to room data used by the app
        delete dtoRoom.link;
        return dtoRoom;
    }

}

