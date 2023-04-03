/**
 * This module contains functions related to sockets for a swarm bot.
 *
 * @packageDocumentation
 */
import { Server } from 'http';
import { Socket } from 'socket.io';
import { RoomServices } from './room';

export namespace SocketIOService {

    var io = require('socket.io');

    /**
     * Initializes the socket.io server on the provided HTTP server and listens for socket connections.
     * @param server The HTTP server to use for socket.io.
     */
    export function initSockets(server: Server) {
        io = io(server);
        io.on('connection', (socket: Socket) => {
            socket.on('join', (roomCode: string, callback: Function) => {
                const room = RoomServices.getRoomByID(roomCode);
                if (room) {
                    socket.join(room.id);
                }
            });
            socket.on('disconnect', () => { });
        });
    }

    /**
     * Emits the specified event with the provided arguments to all clients in the given room.
     * @param roomCode The ID of the room to emit the event to.
     * @param eventName The name of the event to emit.
     * @param args Any arguments to pass with the event.
     */
    export function emitRoom(roomCode: string, eventName: string, ...args: any[]) {
        const room = RoomServices.getRoomByID(roomCode);
        if (!room) {
            console.error(`Room ${roomCode} does not exist.`);
            return;
        }
        io.to(room.id).emit(eventName, ...args);
    }

}

