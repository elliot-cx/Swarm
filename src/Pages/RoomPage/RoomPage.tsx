import { useState } from 'react';
import { HttpUtils } from '../../utils/HttpUtils';
import styles from './RoomPage.module.css';
import { Room } from '../../models/Room';
import RoomComponent from '../../components/Room/Room/RoomComponent';
import Section from '../../components/Section/Section';
import { Bot } from '../../models/Bot/Bot';

export default function RoomsPage(){
    const roomId = new URLSearchParams(window.location.search).get("id");
    console.log(roomId);
    const [room,setRoom] = useState<Room|undefined>(undefined)
    HttpUtils.fetchData('room')
    .then((rooms)=>{
        const room = (rooms as Room[]).filter(room=>room.id==roomId)[0];
        setRoom(room)
    })
    const botsPanel = () => (
        <div className={styles.botsPanel}>
            <div className='botList'>
                {room?.bots.map((bot:Bot,key:number)=>{
                    return <div>
                        <h1>{bot.name}</h1>
                        <p>{`Type: ${bot.type}`}</p>
                        <div className={`${bot.status}Bot`}></div>
                    </div>
                })}
            </div>
        </div>

    )
    return (
        <div className={styles.roomRoot}>
            <Section title1={room?.name} title2={`Gérer la salle ${room?.id}`} contentChildrenNodes={[botsPanel()]}></Section>
        </div>
    )
}