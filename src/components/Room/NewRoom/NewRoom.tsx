import { MouseEventHandler } from "react";
import styles from "./NewRoom.module.css";
import {Room} from "../../../models/Room";
import { fetchData } from "../../../utils/HttpUtils";
export default function NewRoom(){
    const postRoomData = (submit:any) => {
        submit.preventDefault();
        let roomCode:string = submit.target[0].value as string;
        let rooms:Room[]|undefined;
        fetch('localhost:8080/room?provider=JKLM')
        .then((res)=>res.json())
        .then((data)=>rooms = data as Room[])
        const room = rooms ? rooms.filter((obj)=>obj.id===roomCode) : undefined;
        if(room){
            fetchData<Room[]|{success:boolean}>('/room')
            .then(console.log)
        }else{
            console.log('Error when fetching JKLM rooms.')
        }
    }

    return(
        <form onSubmit={postRoomData} id={styles.newRoomRoot}>
            <input id="roomCodeField" type='text' name="roomCode" placeholder="Code de la room"></input>
            <input id={styles.formSubmit}type="submit"></input>
        </form>
    )
}