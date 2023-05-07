/* eslint-disable @typescript-eslint/no-namespace */
import { Observable, from, of } from 'rxjs';
import { PostRoomData, RoomResponse, RoomResponseList } from '../models/dto/RoomResponse.model';
import { HttpUtils } from '../utils/HttpUtils';

export namespace RoomService {
    
    export const getAllRooms = ():Observable<RoomResponseList> => from(HttpUtils.fetchData('room') as Promise<RoomResponseList>);
    
    export const getRoomById = (id:string): Observable <RoomResponse> => from(HttpUtils.fetchData(`room/${id}`) as Promise<RoomResponse>);
    
    export const getAllRoomsFromJKLM = (): Observable <RoomResponseList> => from( HttpUtils.fetchData('room?provider=JKLM') as Promise <RoomResponseList> );

    export const postRoom = (room:PostRoomData): Observable<unknown> => {  
        // Check if room is valid
        if(!room.id) {
            console.log('RoomService.postRoom: room is null');
            return of(null);
        }   

        // Build the post data
        const postData = {
            id:room.id,
            name:room.name,
            type:room.type,
            nbPlayers:room.nbPlayers
        }; 
        
        // Build the fetch params
        const fetchParams = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(postData)
        };            

        // Post the data & return an observable
        return from(HttpUtils.fetchData('room',fetchParams));
    };

    export const deleteRoom = (id:string): Observable<unknown> => from(HttpUtils.fetchData(`room/${id}`, {method:'DELETE'}));

}

