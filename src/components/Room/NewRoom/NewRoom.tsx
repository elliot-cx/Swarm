/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './NewRoom.module.css';
import { useState } from 'react';
import { RoomService } from '../../../services/RoomService';
import { map } from 'rxjs';
import { RoomDto } from '../../../models/dto/RoomDto';

type Props = {
    setNewRoomCode: (newRoomCode:string) => void
}

const NewRoom = ({setNewRoomCode}:Props) => {    
    const [ buttonClicked,setButtonClicked ] = useState<boolean>( false );
    const postRoomData = ( submit: any ) => {
        submit.preventDefault();
        const roomCode:string = submit.target[0].value as string;

        RoomService.getAllRoomsFromJKLM()
            .pipe(
                map( (data: any) => data.publicRooms ),
            // find( (room: any) => room.roomCode === roomCode )
            )
            .subscribe((room: RoomDto) => {
                if(room){
                    RoomService.postRoom(room)
                        .subscribe( (data: any) => {
                            console.log(data);
                            setNewRoomCode(roomCode);
                        });
                }else{
                    console.log('Room not found. rooms', room);
                }
            });
    };

    return(
        <form onSubmit={postRoomData} id={ styles.newRoomRoot }>
            <input id='roomCodeField' type='text' name='roomCode' placeholder='Code de la room'></input>
            <input className={ buttonClicked ? styles.activeFormSubmit : styles.formSubmit } onClick={async ()=>{
                setButtonClicked(true);
                // setTimeout(()=>setButtonClicked(false),1000);
            }} type='submit'></input>
        </form>
    );
};
export default NewRoom;