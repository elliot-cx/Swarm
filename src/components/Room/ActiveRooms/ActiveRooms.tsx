import React, { Component } from "react";
import {Room} from "../../../models/Room";
import styles from "./ActiveRooms.module.css"
import RoomComponent from "../Room/RoomComponent";

type ActiveRoomsState={
    rooms:Room[];
}

export default class ActiveRooms extends Component<{}, ActiveRoomsState> {
    
    fetchAllRooms(){
        console.log('fetching rooms ...');
        
        fetch('http://localhost:6969/room', {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {
            this.changeRooms(data);
        })
        .catch((error) => console.error(error));
    }

    changeRooms(rooms:Room[]){
        this.setState({rooms:rooms})
    }

    constructor(props:any){
        super(props);
        this.state = {
            rooms:[]
        };
        this.fetchAllRooms();
    }

    render = () => { 
        return(
            <div className={styles.activeRoomsRoot}>
                {this.state.rooms.length == 0 && false 
                ? <p>Aucune room n'est gérée par l'application, vous pouvez en ajouter de nouvelles avec le formulaire ci dessous</p>
                : this.state.rooms.map((room:Room,key:number)=>{
                    return(<RoomComponent key={key} room={room}></RoomComponent>)
                })}
                {/* <RoomComponent room={{id:'TEST',name:'TEST_ROOM',type:'TEST_TYPE',nbPlayers:69,isActive:true,bots:[]}}></RoomComponent> */}
            </div>
        )
    }
}