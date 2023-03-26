import { room } from "../models/room";

// Liste des rooms instanciées
var rooms:room[] = [];

export namespace RoomServices {

    export const getAllRooms = (): Array<room> => {
        return rooms;
    }

    // export const getRoomBy = (field: string, val: any): room[] => {
    //     return rooms.filter((room:room) => room[field] == val);
    // }

    export const getRoomByID = (id: string): room | undefined => {
        return rooms.find((room:room) => room.id == id);
    }

    export const deleteRoomByID = (id: string): boolean =>{
        const room = getRoomByID(id);
        rooms = rooms.filter((r:room) => r.id != id);
        return room ? true : false;
    }

    export const createRoom = (room:room): boolean => {
        const r = getRoomByID(room.id);
        if(!r){
            rooms.push(room);
            return true;
        }
        return false;
    }

}