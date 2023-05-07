/* eslint-disable @typescript-eslint/no-namespace */
import { Observable, from, of } from 'rxjs';
import { RoomMapper } from '../mapper/RoomMapper';
import { RoomDto } from '../models/dto/RoomDto';
import { Room } from '../models/Room';
import { HttpUtils } from '../utils/HttpUtils';

export namespace RoomService {
    export const getAllRooms = ():Promise< RoomDto [] > => {
        return HttpUtils.fetchData('room');
    };
    
    export const getRoomById = (id:string): Observable <RoomDto> => from(HttpUtils.fetchData(`room/${id}`) as Promise< RoomDto >);
    
    export const getAllRoomsFromJKLM = (): Observable <RoomDto[]> => from( HttpUtils.fetchData('room?provider=JKLM') as Promise < RoomDto[] > );

    export const postRoom= (room:Room): Observable< any > => {
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
        };
        return from(HttpUtils.fetchData('room',fetchParams));
    };
}

