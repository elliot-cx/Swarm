import { Bot } from "../models/bots/Bot";
import SpamBot from "../models/bots/spamBot";
import { room } from "../models/room";
import fetch from "node-fetch";

// Liste des rooms instanciées
var rooms:room[] = [];

async function getRoomLink(roomCode: string): Promise<{ url?: string }> {
    const url = `https://jklm.fun/api/joinRoom`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomCode })
    });
    const data = await response.json() as { url?: string } ;
    return data;
}

function getBot(room: room,botToken: string): Bot | undefined {
    return room.bots.find(b => b.token == botToken);
}

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

    export const createRoom = async (room:room): Promise<boolean> => {
        const r = getRoomByID(room.id);
        if(!r){
            const result = await getRoomLink(room.id);
            if (result.url) {
                room.link = result.url
                rooms.push(room);
                return true;
            }
        }
        return false;
    }

    // -------------- BOT -------------

    export const addBot = (roomCode:string, bot: any): boolean => {
        const room = getRoomByID(roomCode);
        if (room) {
            switch (bot.type) {
                case "spam":
                    const spamBot = new SpamBot(bot.name,bot.message);
                    room.bots.push(spamBot);
                    break;
            
                default:
                    return false;
            }
            return true;
        }
        return false;
    }

    // Les fonctions dessous peuvent être surement optimisées

    export const connectBot = (roomCode:string, botToken: string): boolean =>{
        const room = getRoomByID(roomCode);
        if (room) {
            const bot = getBot(room,botToken);
            if (bot) {
                bot.connect(roomCode,room.link);
                return true;
            }
        }
        return false;
    }

    export const startBot = (roomCode:string, botToken: string): boolean =>{
        const room = getRoomByID(roomCode);
        if (room) {
            const bot = getBot(room,botToken);
            if (bot) {
                bot.start();
                return true;
            }
        }
        return false;
    }

    export const stopBot = (roomCode:string, botToken: string): boolean =>{
        const room = getRoomByID(roomCode);
        if (room) {
            const bot = getBot(room,botToken);
            if (bot) {
                bot.stop();
                return true;
            }
        }
        return false;
    }

    export const disconnectBot = (roomCode:string, botToken: string): boolean =>{
        const room = getRoomByID(roomCode);
        if (room) {
            const bot = getBot(room,botToken);
            if (bot) {
                bot.disconnect();
                return true;
            }
        }
        return false;
    }

    

}