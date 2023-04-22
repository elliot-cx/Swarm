import styles from "./NewRoom.module.css";
import { HttpUtils } from "../../../utils/HttpUtils";

type Props = {
    setNewRoomCode: (newRoomCode:string) => void
}

const NewRoom = ({setNewRoomCode}:Props) => {
    type RoomData = {
        [key:string]:any
    }    

    const postRoomData = (submit:any) => {
        submit.preventDefault();
        const roomCode:string = submit.target[0].value as string;

        
        HttpUtils.fetchData('room?provider=JKLM')
        .then((data:any) => {
            const rooms = data.publicRooms as RoomData[] | undefined
            const room = rooms ? rooms.find((room:RoomData) => room.roomCode===roomCode) : undefined;
            if(room){
                const postData = {
                    id:room.roomCode,
                    name:room.name,
                    type:room.gameId,
                    nbPlayers:Number(room.playerCount)
                }; 
                const fetchParams = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                }
                HttpUtils.fetchData('room',fetchParams)
                .catch(console.log);
                setNewRoomCode(roomCode);
            }else{
                console.log('Room not found.')
            }
        });

        
    }

    return(
        <form onSubmit={postRoomData} id={styles.newRoomRoot}>
            <input id="roomCodeField" type='text' name="roomCode" placeholder="Code de la room"></input>
            <input id={styles.formSubmit}type="submit"></input>
        </form>
    )
};
export default NewRoom;