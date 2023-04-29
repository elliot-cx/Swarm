import { useEffect, useState } from 'react';
import { HttpUtils } from '../../utils/HttpUtils';
import styles from './RoomPage.module.css';
import { Room } from '../../models/Room';
import RoomComponent from '../../components/Room/Room/RoomComponent';
import Section from '../../components/Section/Section';
import { Bot } from '../../models/Bot/Bot';

export default function RoomsPage() {
    const roomId = new URLSearchParams(window.location.search).get("id");
    const [room, setRoom] = useState<Room | undefined>(undefined);
    useEffect(() => {
        HttpUtils.fetchData<Room>(`room/${roomId}`)
            .then((room: Room) => { setRoom(room); });
    }, [])
    const RoomPanel = () => (
        <div className={styles.roomPanel}>
            <form></form>
        </div>
    )
    const BotsPanel = () => (
        <div className={styles.botsPanel }>
            <div className={styles.botList}>
                {room?.bots.map((bot: Bot, key: number) => {
                    return <div key={key}>
                        <h1>{bot.name}</h1>
                        <p>{`Type: ${bot.type}`}</p>
                        <div className={`${bot.status}Bot`}></div>
                    </div>
                })}
            </div>
        </div>
    )

    const handleBotsFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const nbBots = formData.get('nbBots');
        if (nbBots) {
            // for(let i = 0; i < nbBots; i++){
            //     HttpUtils.postData('bot',{roomId:room?.id})
            // }
        }
    }

    return (
        <div className={styles.roomRoot}>
            <h1>{room?.name}</h1>
        </div>
    )
}