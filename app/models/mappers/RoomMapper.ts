import { Room } from "../room";
import {JKLMRoomListModel, RoomJKLMDtoModel} from "../dto/RoomDTO-JKLM.model";
import {RoomDto} from "../dto/RoomDTO.model";
import {RoomServices} from "../../services/room";

export namespace RoomMapper {

    export const getDtoFromJKLMRoomResponse = (res: JKLMRoomListModel): RoomDto[] => {
        // Create the RoomDto array
        const roomsDto: RoomDto[] = [];
        // Check response
        if(res.publicRooms){
            // Loop rooms in response
            res.publicRooms.forEach((room: any) => {
                // Push a new roomDto
                roomsDto.push({
                    id: room.roomCode as string,
                    name: room.name as string,
                    type: room.gameId as string,
                    nbPlayers: room.playerCount as number,
                    bots: []
                });
            });
        }
        return roomsDto;
    }

    const getRoomDtoFromJKLMDto = (jklmDto: RoomJKLMDtoModel ): RoomDto => {
        // Map jklm room to Dto room
        return {
            id: jklmDto.roomCode as string,
            name: jklmDto.name as string,
            type: jklmDto.gameId as string,
            nbPlayers: jklmDto.playerCount as number,
            bots: []
        }
    }

    export const getDtoFromDoRoom = (room: Room): RoomDto => {
        // Parse to any before modifications
        const roomDto = room as any;
        // Delete unwanted fields
        delete roomDto.link;
        delete roomDto.isActive;

        return roomDto as RoomDto;
    }
    
    export const getDoFromDtoRoom = (roomDto: RoomDto, link: string): Room => {
        // Parse to any before modifications
        const room = roomDto as any;
        // Create link field
        room.link = link;
        // Get is active if the room already exist, set it to false otherwise
        room.isActive = RoomServices.getRoomByID(roomDto.id)?.isActive ?? false;

        return room as Room;
    }
}