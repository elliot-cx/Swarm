import { MouseEventHandler } from "react";
import styles from "./NewRoom.module.css";
export default function NewRoom(){
    const sendRoomData = (e:Event) => {
        e.preventDefault();
        console.log(1);
        const roomCode = (document.getElementById("roomCodeField") as HTMLInputElement).value;
        const headers = { "Content-Type": "application/json" };
        let roomData:any;
        console.log(roomData);
    }   
    return(
        <div id={styles.newRoomRoot}>
            <input id="roomCodeField" type='text' name="roomName" placeholder="Code de la room"></input>
            <input id={styles.formSubmit}type="submit" onClick={sendRoomData as any as MouseEventHandler<HTMLInputElement>}></input>
        </div>
    )
}