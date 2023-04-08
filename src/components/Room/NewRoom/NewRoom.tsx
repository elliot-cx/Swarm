import { MouseEventHandler } from "react";
import styles from "./NewRoom.module.css";
import {Room} from "../../../models/Room";
import { HttpUtils } from "../../../utils/HttpUtils";
export default function NewRoom({activeRoomsRef}:any){
    type RoomData = {
        [key:string]:any
    }    

    const postRoomData = (submit:any) => {
        submit.preventDefault();
        let roomCode:string = submit.target[0].value as string;
        console.log(roomCode);
        fetch('http://localhost:6969/room?provider=JKLM',)
        .then((res)=>res.json())
        .then((rooms)=> {
            rooms = rooms.publicRooms as RoomData[] | undefined
            const room = rooms ? rooms.find((room:RoomData) => room.roomCode===roomCode) : undefined;
            if(room){
                const postData = {
                    id:room.roomCode,
                    name:room.name,
                    type:room.gameId,
                    nbPlayers:Number(room.playerCount)
                }; 
                fetch('http://localhost:6969/room', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                }).then((res)=>res.json())
                .then((data)=>{
                    if(data && activeRoomsRef.current) activeRoomsRef.current.updateRooms();
                })
                .catch(console.log);
            }else{
                console.log('Room not found.')
            }
        });

        
    }

    return(
        <form onSubmit={postRoomData} id={styles.newRoomRoot}>
            <input id="roomCodeField" type='text' name="roomCode" placeholder="Code de la room"></input>
            <input id={styles.formSubmit}type="submit"></input>
        </form>
    )
}