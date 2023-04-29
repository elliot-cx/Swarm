import styles from "./NewRoom.module.css";
import { HttpUtils } from "../../../utils/HttpUtils";
import { useState } from "react";
import { RoomService } from "../../../services/Roomservice";
import { RoomDto } from "../../../models/dto/RoomDto";

type Props = {
    setNewRoomCode: (newRoomCode:string) => void
}

const NewRoom = ({setNewRoomCode}:Props) => {
    type RoomData = {
        [key:string]:any
    }    
    const [ buttonClicked,setButtonClicked ] = useState<boolean>( false );
    const postRoomData = ( submit:any ) => {
        submit.preventDefault();
        const roomCode:string = submit.target[0].value as string;


        RoomService.getAllRoomsFromJKLM()
         .then((rooms:RoomDto[]) => {
            const room = rooms ? rooms.find((room:RoomData) => room.roomCode===roomCode) : undefined;
            if(room){
                RoomService.postRoom(room)
                .then( _ => setNewRoomCode(roomCode))
                .catch(console.log);
            }else{
                console.log('Room not found.')
            }
        });
    }

    return(
        <form onSubmit={postRoomData} id={ styles.newRoomRoot }>
            <input id="roomCodeField" type='text' name="roomCode" placeholder="Code de la room"></input>
            <input className={ buttonClicked ? styles.activeFormSubmit : styles.formSubmit } onClick={async ()=>{
                setButtonClicked(true);
                // setTimeout(()=>setButtonClicked(false),1000);
                }} type="submit"></input>
        </form>
    )
};
export default NewRoom;