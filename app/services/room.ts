import { Bot, BotAction, BotType } from "../models/bots/Bot";
import { JklmService } from "./jklm";
import { Room } from "../models/room";
import ResponderBot from "../models/bots/ResponderBot";
import SpamBot from "../models/bots/SpamBot";
import TrackerBot from "../models/bots/TrackerBot";
import fetch from "node-fetch";
import CommandBot from "../models/bots/CommandBot";
import OsintBot from "../models/bots/OsintBot";
import PopSauceBot from "../models/bots/PopSauceBot";
import BombpartyBot from "../models/bots/BombpartyBot";

// Liste des rooms instanciées
var rooms: Room[] = [];

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
 * @param botid The id assigned to the bot
 * @returns The bot if found, otherwise undefined
 */
function getBot(room: Room, botid: string): Bot | undefined {
    return room.bots.find(b => b.id == botid);
}

/**
 * This namespace is for managing Swarm's rooms
 */
export namespace RoomServices {

    /**
     * Returns all rooms currently instantiated in the Swarm
     * @returns An array of all instantiated rooms
     */
    export const getAllRooms = (): Array<Room> => {
        return rooms;
    }

    // export const getRoomBy = (field: string, val: any): room[] => {
    //     return rooms.filter((room:room) => room[field] == val);
    // }

    /**
     * Retrieves the instance of a room with the given ID
     * @param id The ID of the Swarm room being retrieved
     * @returns The instance of the room, if found, otherwise undefined
     */
    export const getRoomByID = (id: string): Room | undefined => {
        return rooms.find((room: Room) => room.id == id);
    }

    /**
     * Deletes the room with the given ID
     * @param id The ID of the Swarm room to delete
     * @returns True if the room was deleted, otherwise false
     */
    export const deleteRoomByID = (id: string): boolean => {
        const room = getRoomByID(id);
        rooms = rooms.filter((r: Room) => r.id != id);
        return room ? true : false;
    }

    /**
     * Creates a new room and adds it to the list of instantiated rooms
     * @param room The room to create
     * @returns True if the room was created and added to the list of instantiated rooms, otherwise false
     */
    export const createRoom = async (room: Room): Promise<boolean> => {
        const r = getRoomByID(room.id);
        if (!r) {
            const result = await getRoomLink(room.id);
            const jklmRoom = await JklmService.getRoomFromJKLM(room.id);
            if (result.url) {
                if (jklmRoom) {
                    room.name = jklmRoom.name;
                    room.nbPlayers = jklmRoom.playerCount;
                    room.type = jklmRoom.gameId;
                }
                room.link = result.url;
                room.isActive = false;
                room.bots = [];
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
     * @returns The id for the added bot, if successful, otherwise false
     */
    export const addBot = (roomCode: string, bot: any): string | false => {
        const room = getRoomByID(roomCode);
        if (room) {
            switch (bot.type) {
                case BotType.SPAM:
                    const spamBot = new SpamBot(bot.name, bot.message);
                    room.bots.push(spamBot);
                    return spamBot.id;
                case BotType.RESPONDER:
                    const responderBot = new ResponderBot(bot.name, bot.delay);
                    room.bots.push(responderBot);
                    return responderBot.id;
                case BotType.TRACKER:
                    const trackerBot = new TrackerBot(bot.name, bot.nickname, bot.targetAuth);
                    room.bots.push(trackerBot);
                    return trackerBot.id;
                case BotType.COMMAND:
                    const commandBot = new CommandBot(bot.name);
                    room.bots.push(commandBot);
                    return commandBot.id;
                case BotType.POPSAUCE:
                    const popsauceBot = new PopSauceBot(bot.name);
                    room.bots.push(popsauceBot);
                    return popsauceBot.id;
                case BotType.BOMBPARTY:
                    const bombpartyBot = new BombpartyBot(bot.name);
                    room.bots.push(bombpartyBot);
                    return bombpartyBot.id;
                case BotType.OSINT:
                    const osintBot = new OsintBot(bot.name, bot.peerId);
                    room.bots.push(osintBot);
                    return osintBot.id;
                default:
                    return false;
            }
        }
        return false;
    }

    /**
     * Adds a number of bots to a room
     * @param roomCode The code for the room where the bot will be added
     * @param bot The bot to be added
     * @param number The number of bot to be added
     * @returns The id for the added bot, if successful, otherwise false
     */
    export const addBots = (roomCode: string, bot: any, number: number): boolean => {
        const room = getRoomByID(roomCode);
        if (room && room.bots.length <= 16 - number) {
            for (let index = 0; index < number; index++) {
                if (!addBot(roomCode, bot)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Manages a bot's status to a room
     * @param roomCode The code for the room where the bot is located
     * @param botid The token assigned to the bot being managed
     * @param action The action to perform on the bot (connect, disconnect, start, stop)
     * @returns True if the bot was successfully managed, otherwise false
     */
    export const manageBot = (roomCode: string, botid: string, action: BotAction): boolean => {
        const room = getRoomByID(roomCode);
        if (!room) {
            return false;
        }
        const bot = getBot(room, botid);
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
     * Manages a all bot's status of a specified room
     * @param roomCode The code for the room to manage
     * @param action The action to perform on the bots (connect, disconnect, start, stop)
     * @returns True if the bots were successfully managed, otherwise false
     */
    export const manageRoomBots = (roomCode: string, action: BotAction) => {
        const room = getRoomByID(roomCode);
        if (!room) {
            return false;
        }
        room.bots.map((bot: Bot) => manageBot(roomCode, bot.id, action));
        return true;
    }

    /**
     * Updates the properties of a bot
     * @param roomCode The code for the room where the bot is located
     * @param botid The id assigned to the bot being updated
     * @param props The properties that will be changed
     * @returns True if the bot was successfully updated, otherwise false 
     */
    export const updateBot = (roomCode: string, botid: string, props: any): boolean => {
        const room = getRoomByID(roomCode);
        if (!room) {
            return false;
        }
        const bot = getBot(room, botid);
        if (!bot) {
            return false;
        }
        // Loop properties and change if available
        for (const key in props) {
            if (Object.prototype.hasOwnProperty.call(props, key)) {
                if (!["id", "socket", "token", "auth", "status"].includes(key)) {
                    bot[key] = props[key];
                }
            }
        }
        return true;
    }

    /**
     * Delete a specific bot
     * @param roomCode The code for the room where the bot is located
     * @param botid The id assigned to the bot being updated
     * @returns True if the bot was successfully deleted, otherwise false 
     */
    export const deleteBot = (roomCode: string, botid: string): boolean => {
        const room = getRoomByID(roomCode);
        if (!room) {
            return false;
        }
        const bot = getBot(room, botid);
        if (!bot) {
            return false;
        }
        bot.disconnect();
        room.bots = room.bots.filter((bot: Bot) => bot.id != botid);
        bot.onDelete();
        return true;
    }
}