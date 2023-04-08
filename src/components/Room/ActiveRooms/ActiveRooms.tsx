import { forwardRef, useImperativeHandle, useState } from "react";
import {Room} from "../../../models/Room";
import styles from "./ActiveRooms.module.css"
import RoomComponent from "../Room/RoomComponent";

const ActiveRooms = forwardRef((props, ref)=>{

    const fecthAllRooms = () => {
        fetch('http://localhost:6969/room', {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setRooms(data);
        })
        .catch((error) => console.error(error));
    }
    fecthAllRooms()
    useImperativeHandle(ref,()=>{
        const updateRooms = () => {
            console.log("update rooms");
            fecthAllRooms();
        }
    })
    const [rooms, setRooms] = useState<Room[]>([]);

    return(
        <>
            {rooms.length == 0 
            ? <p>Aucune room n'est gérée par l'application, vous pouvez en ajouter de nouvelles avec le formulaire ci dessous</p>
            : rooms.map((room,key)=>{
                return(<div key={key}><RoomComponent room={room}></RoomComponent></div>)
            })}
        </>
    )
});
export default ActiveRooms;