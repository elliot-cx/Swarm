import { jklmRoom } from '../models/jklmRoom'
import fetch from 'node-fetch'

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
   export const getAllRoomsFromJKLM = async (): Promise<jklmRoom[]> => {
      const url = `https://jklm.fun/api/rooms`
      const response = await fetch(url, {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' },
      })
      const data: any = await response.json()
      return data.publicRooms
   }

   export const getRoomFromJKLM = async (
      roomCode: string
   ): Promise<jklmRoom | undefined> => {
      const rooms = await getAllRoomsFromJKLM()
      return rooms.find((room: any) => room.roomCode == roomCode)
   }
}
