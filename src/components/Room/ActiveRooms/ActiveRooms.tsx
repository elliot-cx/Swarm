import { useState } from "react";
import {Room} from "../../../models/Room";
import styles from "./ActiveRooms.module.css"
import RoomComponent from "../Room/RoomComponent";
export default function ActiveRooms(){
    const fecthAllRooms = () => {
        fetch('http://localhost:6969/room', {
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {})
            .catch((error) => console.error(error));
    }
    fecthAllRooms()
    const [rooms, setRooms] = useState<Room[]>([]);
    return(
        <div id={styles.activeRoomsRoot}>
            {rooms.length == 0 
            ? <p>Aucune room n'est gérée par l'application, vous pouvez en ajouter de nouvelles avec le formulaire ci dessous</p>
            : rooms.map((room,key)=>{
                return(<div key={key}><RoomComponent room={room}></RoomComponent></div>)
            })}
        </div>
    )
}