import { useEffect, useState } from "react";
import {Room} from "../../../models/Room";
import styles from "./ActiveRooms.module.css"
import RoomComponent from "../Room/RoomComponent";
import { RoomDto } from "../../../models/dto/RoomDto";
import { RoomMapper } from "../../../mapper/RoomMapper";
import { RoomService } from "../../../services/RoomService";

type Props = {
    newRoomCode:string
}

const ActiveRooms= ({newRoomCode}:Props) => {
    const [rooms,setRooms] = useState<Room[]>([])
    const fetchAllRooms = () =>{    
        RoomService.getAllRooms()
       .then((data) => {
            setRooms([])
            for(let room of data as Room[]){
                room = RoomMapper.getRoomDoFromDto(room) as Room;
                if(!rooms.includes(room)) pushRoom(room);
            }
        })
    }
    const pushRoom = (room:Room) => {
        setRooms([...rooms as Room[], room]);
    }
    useEffect(()=>{
        fetchAllRooms();
    },[]);

    useEffect(()=>{
        // Hook with NewRoom.tsx
        RoomService.getRoomById(newRoomCode)
        .subscribe((data: any) => {
            const room = (data?.success ? data.success : data) as RoomDto;
            // Map the room dto to a Room object
            const newRoom = RoomMapper.getRoomDoFromDto( room ) as Room;
            // Add the room to the list
            if(!rooms.includes( room )) setRooms( [...rooms as Room[], newRoom] );                
        });
    },[newRoomCode])

    const onRoomClose = (roomCode: string) => {
        setRooms( rooms.filter(( room: Room ) => room.id!==roomCode ));
    }    

    return(
        <div className= { styles.activeRoomsRoot }>
            {rooms.length > 0 
            ? rooms.map(( room: Room,index: number )=>{
                return( <RoomComponent onRoomClose= { onRoomClose } key= { index } room= { room }></RoomComponent> )
            })
            :  <p>Aucune room n'est gérée par l'application, vous pouvez en ajouter de nouvelles avec le formulaire ci dessous</p>}
        </div>
    )
};
export default ActiveRooms;