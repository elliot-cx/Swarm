/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './NewRoom.module.css';
import { useState } from 'react';
import { RoomService } from '../../../services/RoomService';
import { RoomResponseList } from '../../../models/dto/RoomResponse.model';

type Props = {
    setNewRoomCode: (newRoomCode:string) => void
}

const NewRoom = ({setNewRoomCode}:Props) => {    
    const [ buttonClicked,setButtonClicked ] = useState<boolean>( false );
    const postRoomData = ( submit: any ) => {
        submit.preventDefault();
    
        RoomService.getAllRoomsFromJKLM()
            .subscribe( (data: RoomResponseList) => {
                const roomCode:string = submit.target[0].value as string;
                const room = data.success.find( room => room.id === roomCode);
                if(room){
                    RoomService.postRoom(room)
                        .subscribe( (data: any) => {
                            if (data?.success ?? false) {
                                setNewRoomCode(roomCode);
                            }
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