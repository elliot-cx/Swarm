import { RoomMapper } from "../mapper/RoomMapper";
import { RoomDto } from "../models/dto/RoomDto"
import { Room } from "../models/Room"
import { HttpUtils } from "../utils/HttpUtils"

export namespace RoomService {
    export const getAllRooms = ():Promise< RoomDto [] > => {
        return HttpUtils.fetchData('room');
    }
    
    export const getRoomById = (id:string):Promise< RoomDto > => {
        return HttpUtils.fetchData(`room/${id}`);
    }
    
    export const getAllRoomsFromJKLM = (): Promise< RoomDto [] > => {
        return HttpUtils.fetchData('room?provider=JKLM');
    }

    export const postRoom= (room:Room):Promise< any > => {
        const roomDto = RoomMapper.getRoomDoFromDto(room);
        const postData = {
            id:roomDto.id,
            name:roomDto.name,
            type:roomDto.type,
            nbPlayers:roomDto.nbPlayers
        }; 
        const fetchParams = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(postData)
        }
        return HttpUtils.fetchData('room',fetchParams)
    }
}

