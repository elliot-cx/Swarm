import { useState } from "react"
import {Room} from '../../../models/Room';
import styles from './RoomComponent.module.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
const MAX_BOT = 16;
type Props={
    room:Room,
    onRoomClose(roomCode:string):void
}
export default function RoomComponent ({room, onRoomClose}:Props){
    const [displayedRoom,setDisplayedRoom] = useState<Room>(room)
    return(
        <div id={styles.roomRoot}>
            <div className={styles.columnContainer}>
                <h1>{displayedRoom.id}</h1>
                <h2>{displayedRoom.name}</h2>
                <div className={styles.roomInfo}>
                    <p>Game: {displayedRoom.type} </p>
                    <p>Players: {displayedRoom.nbPlayers} </p>
                    <p>Bots: {displayedRoom.bots.length} / {MAX_BOT}</p>
                </div>
            </div>
            <div className={styles.columnContainer}>
                <Link to={`./room?id=${displayedRoom.id}`} className={styles.selectRoom}><FontAwesomeIcon size="2x" icon={faCheck}></FontAwesomeIcon></Link>
                <div className={styles.activityIconContainer}>
                    <div className={ `${styles.activityIcon} ${displayedRoom.isActive ? styles.ativeIcon : styles.inactiveIcon}`}></div>
                </div>
                
            </div>
            <div className = {styles.quitButton}><FontAwesomeIcon icon={faClose} onClick={ ()=>onRoomClose(displayedRoom.id)}></FontAwesomeIcon></div>
        </div>
    )
}