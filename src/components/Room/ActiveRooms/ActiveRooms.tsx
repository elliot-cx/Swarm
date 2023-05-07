import { useEffect, useState } from 'react';
import {Room} from '../../../models/Room';
import styles from './ActiveRooms.module.css';
import RoomComponent from '../Room/RoomComponent';
import { RoomResponseList } from '../../../models/dto/RoomResponse.model';
import { RoomService } from '../../../services/RoomService';
import { RoomMapper } from '../../../mapper/RoomMapper';

type Props = {
    newRoomCode:string
}

const ActiveRooms= ({newRoomCode}:Props) => {
    const [rooms,setRooms] = useState<Room[]>([]);

    const fetchAllRooms = () =>{ 
        console.log('Fetching all rooms');
        RoomService.getAllRooms()
            .subscribe((data: RoomResponseList) => {
                const newRooms = (data?.success ? data.success : data) as Room[];
                for(const newRoom of newRooms){
                    if(rooms.includes(newRoom)){
                        const index = newRooms.findIndex(element => element.id === newRoom.id);
                        if(index > -1) newRooms.splice(index,1);
                    }
                }
                setRooms(rooms.concat(RoomMapper.getRoomDoFromRoomDtoList(newRooms)));  
            });

    };
    
    useEffect(()=>{
        fetchAllRooms();
    },[]);

    useEffect(()=>{
        // Hook with NewRoom.tsx
        RoomService.getRoomById(newRoomCode)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .subscribe((data: any) => {
                const room = (data?.success ? data.success : data) as Room;
                // Map the room dto to a Room object
                // Add the room to the list
                if( room && !rooms.includes( room ) ){
                    setRooms( rooms.concat(RoomMapper.getRoomDoFromRoomDtoList([room].flat() )));
                }               
            });
    },[newRoomCode]);

    const onRoomClose = (roomCode: string) => {
        setRooms( rooms.filter(( room: Room ) => room.id!==roomCode ));
        RoomService.deleteRoom(roomCode);
    };

    return(
        <div className= { styles.activeRoomsRoot }>
            {rooms.length > 0 
                ? rooms.map(( room: Room,index: number )=>{
                    return( <RoomComponent onRoomClose= { onRoomClose } key= { index } room= { room }></RoomComponent> );
                })
                :  <p>Aucune room n&apos;est gérée par l&apos;application, vous pouvez en ajouter de nouvelles avec le formulaire ci dessous</p>}
        </div>
    );
};
export default ActiveRooms;