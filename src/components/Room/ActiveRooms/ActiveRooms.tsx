import React, { Component, forwardRef, useEffect, useState } from "react";
import {Room} from "../../../models/Room";
import styles from "./ActiveRooms.module.css"
import RoomComponent from "../Room/RoomComponent";

type ActiveRoomsState={
    rooms:Room[];
}

type Props = {
    ref:any
}

const ActiveRooms = forwardRef((props:any,ref) => {
    const [rooms,setRooms] = useState<Room[]>([])
    
    const fetchAllRooms = () =>{
        console.log('fetching rooms ...');
        
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

    useEffect(()=>{
        fetchAllRooms();
    },[]);

    return(
        
        <div className={styles.activeRoomsRoot}>
            {rooms.length == 0 
            ? <p>Aucune room n'est gérée par l'application, vous pouvez en ajouter de nouvelles avec le formulaire ci dessous</p>
            : rooms.map((room:Room,index:number)=>{
                return(<RoomComponent key={index} room={room}></RoomComponent>)
            })}
            {/* <RoomComponent room={{id:'TEST',name:'TEST_ROOM',type:'TEST_TYPE',nbPlayers:69,isActive:true,bots:[]}}></RoomComponent> */}
        </div>
    )
});
export default ActiveRooms;