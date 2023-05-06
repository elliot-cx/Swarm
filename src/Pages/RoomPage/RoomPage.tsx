import { useEffect, useState } from 'react';
import styles from './RoomPage.module.css';
import { Room } from '../../models/Room';
import { Bot } from '../../models/Bot/Bot';
import { RoomResponse } from '../../models/dto/RoomResponse.model';
import { RoomService } from '../../services/RoomService';
import { RoomMapper } from '../../mapper/RoomMapper';

export default function RoomsPage() {
    
    const roomId = new URLSearchParams(window.location.search).get('id') as string;
    const [room, setRoom] = useState<Room>({id:'',name:'',type:'',nbPlayers:0,isActive:false, bots:[]});

    useEffect(() => {
        RoomService.getRoomById(roomId)
            .subscribe( (roomResponse: RoomResponse) =>  setRoom(RoomMapper.getRoomDoFromDtoJKLM(roomResponse.success)));
    }, []);

    const BotsPanel = () => (
        <div className={styles.botsPanel }>
            <div className={styles.botList}>
                {room?.bots.map((bot: Bot, key: number) => {
                    return (
                        <div key={key}>
                            <h1>{bot.name}</h1>
                            <p>{`Type: ${bot.type}`}</p>
                            <div className={`${bot.status}Bot`}></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className={styles.roomRoot}>
            <div className= { styles.roomPageSection } >
                <h1 className={ styles.roomNameTitle }>{room?.name}</h1>
                {BotsPanel()}
            </div>
        </div>
    );
}