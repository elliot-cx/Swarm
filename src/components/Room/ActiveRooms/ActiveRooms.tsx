import React, { Component, forwardRef, useEffect, useState } from "react";
import {Room} from "../../../models/Room";
import styles from "./ActiveRooms.module.css"
import RoomComponent from "../Room/RoomComponent";
import { HttpUtils } from "../../../utils/HttpUtils";
import { RoomDto } from "../../../models/dto/RoomDto";
import { RoomMapper } from "../../../mapper/RoomMapper";

type ActiveRoomsState={
    rooms:Room[];
}

type Props = {
    newRoomCode:string
}

const ActiveRooms= ({newRoomCode}:Props) => {
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
            setRooms([])
            for(let room of data){
                setRooms([...rooms, RoomMapper.getRoomDoFromDto(room)]);
            }
        })
        .catch((error) => console.error(error));
    }

    useEffect(()=>{
        fetchAllRooms();
    },[]);

    useEffect(()=>{
        console.log("newroom")
        HttpUtils.fetchData(`room/${newRoomCode}`)
        .then((data:any) => {
            const room = data as RoomDto;
            setRooms([...rooms, RoomMapper.getRoomDoFromDto(room)]);    
        })
    },[newRoomCode])

    const onRoomClose = (roomCode:string) => {
        console.log('room closed');
        setRooms(rooms.filter((room:Room)=>room.id!==roomCode))
    }

    return(
        
        <div className={styles.activeRoomsRoot}>
            {rooms.length > 0 
            ? rooms.map((room:Room,index:number)=>{
                return(<RoomComponent onRoomClose={onRoomClose} key={index} room={room}></RoomComponent>)
            })
            :  <p>Aucune room n'est gérée par l'application, vous pouvez en ajouter de nouvelles avec le formulaire ci dessous</p>}
        </div>
    )
};
export default ActiveRooms;