import { useState } from "react";
import Room from "../../../models/Room";
import styles from "./ActiveRooms.module.css"
import RoomComponent from "../Room/RoomComponent";
export default function ActiveRooms(){
    const fecthAllRooms = () => {
        fetch('http://localhost:8080/room',{
            mode:'no-cors'
        })
        .then((res)=> res.body ? res.json() : null)
        .then((data)=> data ? console.log(data) : console.log('no data'));
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