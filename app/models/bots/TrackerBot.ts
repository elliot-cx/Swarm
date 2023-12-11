import { JklmService } from "../../services/jklm";
import { Room } from "../room";
import { Bot, BotStatus } from "./Bot";

export default class TrackerBot extends Bot {

    nickname?: string;
    targetAuth?: any;
    tracking: boolean;
    targetRooms: string[];
    roomsToCheck: any[];

    constructor(name: string, nickname?: string, targetAuth?: any) {
        super(name);
        this.nickname = nickname;
        this.targetAuth = targetAuth;
        this.tracking = false;
        this.targetRooms = [];
        this.roomsToCheck = [];
    }

    toJSON() {
        const { socket, roomCode,roomsToCheck, ...json } = this;
        return json;
    }

    onStatusChanged(status: BotStatus, data?: any): void {
        switch (status) {
            case BotStatus.CONNECTED:
                this.roomCode = data.roomEntry.roomCode;
                if (this.tracking) {
                    this.checkRoom();
                }
                break;
            case BotStatus.ACTIVE:
                this.tracking = true;
                JklmService.getAllRoomsFromJKLM().then((res) => {
                    this.roomsToCheck = res;
                    this.checkRoom();
                });
                
                break;
            case BotStatus.BANNED:
                this.switchRoom();
                break;
        }
    }

    checkRoom() {
        console.log(`Checking room ${this.roomCode}`);
        this.emit("getChatterProfiles", (chatterProfiles: any) => {
            
            chatterProfiles.map((profile: any) => {
                if (this.nickname && profile.nickname == this.nickname) {
                    this.targetRooms.push(this.roomCode);
                    console.log(`The target player ${this.nickname} has been found in room : ${this.roomCode}`);
                } else if (this.targetAuth && profile.auth != null && profile.auth.id == this.targetAuth) {
                    this.targetRooms.push(this.roomCode);
                    console.log(`The target player ${this.targetAuth} has been found in room : ${this.roomCode}`);
                }
            });
            this.switchRoom();
        });
    }

    switchRoom(){
        this.disconnect();
        if (this.roomsToCheck.length == 0) {
            console.log("All rooms has been checked");
            console.log(this.targetRooms);
            this.tracking = false;
        } else {
            const roomToCheck = this.roomsToCheck.pop();
            setTimeout(()=>{
                this.connect(roomToCheck.roomCode, roomToCheck.link);
            },2000);
            
        }
    }
}