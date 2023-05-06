import {RoomJKLMDtoModel} from "../models/dto/RoomDTO-JKLM.model";

/**
 * This module contains functions related to JKLM for get JKLM data
 *
 * @packageDocumentation
 */
export namespace JklmService {
    /**
     * Returns all rooms currently available from a provider such as JKLM.FUN
     * @returns An array of all available rooms from the provider
     */
    export const getAllRoomsFromJKLM = async (): Promise<{publicRooms: RoomJKLMDtoModel[]}> => {
        const url = `https://jklm.fun/api/rooms`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        return await response.json();
    }
}