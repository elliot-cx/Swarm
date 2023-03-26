import express, { Request, Response } from "express";
import { RoomServices } from "../services/room";

const router = express.Router();

// Récupère toutes les rooms instanciées
router.get("/",(req: Request, res: Response)=>{
    res.json(RoomServices.getAllRooms());
});

// Créer une room
router.post("/",(req: Request, res: Response)=>{
    res.json({"success":RoomServices.createRoom(req.body)});
});


// Récupère une room avec son ID
router.get("/:id",(req: Request, res: Response)=>{
    res.json({"success":RoomServices.getRoomByID(req.params.id)});
});

// Supprimer une room
router.delete("/:id",(req: Request, res: Response)=>{
    res.json({"success":RoomServices.deleteRoomByID(req.params.id)});
});



export default router;