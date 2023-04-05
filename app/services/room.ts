import { Bot, BotAction, BotStatus, BotType } from "../models/bots/Bot";
import ResponderBot from "../models/bots/ResponderBot";
import SpamBot from "../models/bots/spamBot";
import { room } from "../models/room";
import fetch from "node-fetch";

// Liste des rooms instanciées
var rooms: room[] = [];

/**
 * Asynchronously checks if a game room is open and returns the URL
 * @param roomCode The code for the room being checked
 * @returns An object with the URL of the open room, if found
 */
async function getRoomLink(roomCode: string): Promise<{ url?: string }> {
    const url = `https://jklm.fun/api/joinRoom`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode })
    });
    const data = await response.json() as { url?: string };
    return data;
}

/**
 * Returns the bot with the given token from a room
 * @param room A Swarm room instance
 * @param botToken The token assigned to the bot
 * @returns The bot if found, otherwise undefined
 */
function getBot(room: room, botToken: string): Bot | undefined {
    return room.bots.find(b => b.token == botToken);
}

/**
 * This namespace is for managing Swarm's rooms
 */
export namespace RoomServices {

    /**
     * Returns all rooms currently instantiated in the Swarm
     * @returns An array of all instantiated rooms
     */
    export const getAllRooms = (): Array<room> => {
        return rooms;
    }

    /**
     * Returns all rooms currently available from a provider such as JKLM.FUN
     * @returns An array of all available rooms from the provider
     */
    export const getAllRoomsFromJKLM = async (): Promise<{ [key: string]: any }> => {
        const url = `https://jklm.fun/api/rooms`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return data;
    }

    // export const getRoomBy = (field: string, val: any): room[] => {
    //     return rooms.filter((room:room) => room[field] == val);
    // }

    /**
     * Retrieves the instance of a room with the given ID
     * @param id The ID of the Swarm room being retrieved
     * @returns The instance of the room, if found, otherwise undefined
     */
    export const getRoomByID = (id: string): room | undefined => {
        return rooms.find((room: room) => room.id == id);
    }

    /**
     * Deletes the room with the given ID
     * @param id The ID of the Swarm room to delete
     * @returns True if the room was deleted, otherwise false
     */
    export const deleteRoomByID = (id: string): boolean => {
        const room = getRoomByID(id);
        rooms = rooms.filter((r: room) => r.id != id);
        return room ? true : false;
    }

    /**
     * Creates a new room and adds it to the list of instantiated rooms
     * @param room The room to create
     * @returns True if the room was created and added to the list of instantiated rooms, otherwise false
     */
    export const createRoom = async (room: room): Promise<boolean> => {
        const r = getRoomByID(room.id);
        if (!r) {
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

    /**
     * Adds a bot to a room
     * @param roomCode The code for the room where the bot will be added
     * @param bot The bot to be added
     * @returns The token for the added bot, if successful, otherwise false
     */
    export const addBot = (roomCode: string, bot: any): string | false => {
        const room = getRoomByID(roomCode);
        if (room) {
            switch (bot.type) {
                case BotType.SPAM:
                    const spamBot = new SpamBot(bot.name, bot.message);
                    room.bots.push(spamBot);
                    return spamBot.token;
                case BotType.RESPONDER:
                    const responderBot = new ResponderBot(bot.name);
                    room.bots.push(responderBot);
                    return responderBot.token;
                default:
                    return false;
            }
        }
        return false;
    }

    /**
     * Manages a bot's status to a room
     * @param roomCode The code for the room where the bot is located
     * @param botToken The token assigned to the bot being managed
     * @param action The action to perform on the bot (connect, disconnect, start, stop)
     * @returns True if the bot was successfully managed, otherwise false
     */
    export const manageBot = (roomCode: string, botToken: string, action: BotAction): boolean => {
        const room = getRoomByID(roomCode);
        if (!room) {
            return false;
        }
        const bot = getBot(room, botToken);
        if (!bot) {
            return false;
        }
        switch (action) {
            case BotAction.CONNECT:
                bot.connect(roomCode, room.link);
                break;
            case BotAction.DISCONNECT:
                bot.disconnect();
                break;
            case BotAction.START:
                bot.start();
                break;
            case BotAction.STOP:
                bot.stop();
                break;
            default:
                return false;
        }
        return true;
    };

    /**
     * Updates the properties of a bot
     * @param roomCode The code for the room where the bot is located
     * @param botToken The token assigned to the bot being updated
     * @param props The properties that will be changed
     * @returns True if the bot was successfully updated, otherwise false 
     */
    export const updateBot = (roomCode: string, botToken: string, props: any): boolean => {
        return true;
    }
}