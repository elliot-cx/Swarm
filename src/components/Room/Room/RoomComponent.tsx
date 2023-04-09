import { useState } from "react"
import {Room} from '../../../models/Room';
import styles from './RoomComponent.module.css'
import { Link } from "react-router-dom";
const MAX_BOT = 16;
type Props={
    room:Room
}
export default function RoomComponent ({room}:Props){
    const [displayedRoom,setDisplayedRoom] = useState<Room>(room)
    return(
        <div id={styles.roomRoot}>
            <div className={styles.columnContainer}>
                <h1>{displayedRoom.id}</h1>
                <h2>{displayedRoom.name}</h2>
                <div>
                    <p>{`Game: ${displayedRoom.type}`} </p>
                    <p>{`Players: ${displayedRoom.nbPlayers}`} </p>
                    <p>{`Bots: ${displayedRoom.bots.length} / ${MAX_BOT}`}</p>
                </div>
            </div>
            <div className={styles.columnContainer}>
                <Link to='./rooms' className={styles.selectRoom}><FontAwesomeIcon></FontAwesomeIcon></Link>
                <div className={displayedRoom.isActive ? styles.ativeIcon : styles.inactiveIcon}></div>
            </div>
        </div>
    )
}