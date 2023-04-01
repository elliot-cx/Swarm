import { Server } from 'http';
import { Socket } from 'socket.io';
import { RoomServices } from './room';

export namespace SocketIOService{

    var io = require('socket.io');

    export function initSockets(server: Server) {
        // Initialisation du serveur
        io = io(server);
        // Connexion du client React
        io.on('connection', (socket: Socket) => {
    
            // Le client veut écouter les MAJ des bots
            socket.on('join', (roomCode: string,  callback: void) => {
                const room = RoomServices.getRoomByID(roomCode);
                if (room) socket.join(room.id);
            });
    
            // Déconnexion
            socket.on('disconnect', () => {});
    
        });
    }

    export function emitRoom(roomCode: string, eventName: string, ...args: any[]) {
        const room = RoomServices.getRoomByID(roomCode);
        if (!room) {
          console.error(`Room ${roomCode} does not exist.`);
          return;
        }
        io.to(room.id).emit(eventName, ...args);
    }
    
}

