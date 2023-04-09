import { useState } from 'react';
import { HttpUtils } from '../../utils/HttpUtils';
import styles from './RoomPage.module.css';
import { Room } from '../../models/Room';

export default function RoomsPage(){
    const roomId = new URLSearchParams(window.location.search).get("id");
    console.log(roomId);
    const [room,setRoom] = useState<Room|undefined>(undefined)
    HttpUtils.fetchData('room')
    .then((rooms)=>{
        let room = (rooms as Room[]).filter(room=>room.id==roomId)[0];
        setRoom(room)
    })
    return (
        <div className={styles.roomRoot}>{room?.name}</div>
    )
}