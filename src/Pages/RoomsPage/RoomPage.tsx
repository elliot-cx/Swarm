import styles from './RoomsPage.module.css';

export default function RoomsPage(){
    const roomId = new URLSearchParams().get("id");
    console.log(roomId);
    return (
        <div>Room Page</div>
        )
}