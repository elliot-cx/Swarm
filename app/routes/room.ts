import express, { Request, Response } from "express";
import { RoomServices } from "../services/room";

const router = express.Router();

// Récupère toutes les rooms instanciées
router.get("/",(req: Request, res: Response)=>{
    res.json(RoomServices.getAllRooms());
});

// Créer une room
router.post("/",async (req: Request, res: Response)=>{
    res.json({"success": await RoomServices.createRoom(req.body)});
});


// Récupère une room avec son ID
router.get("/:id",(req: Request, res: Response)=>{
    res.json({"success":RoomServices.getRoomByID(req.params.id)});
});

// Supprimer une room
router.delete("/:id",(req: Request, res: Response)=>{
    res.json({"success":RoomServices.deleteRoomByID(req.params.id)});
});

// ---------------- BOT -------------------

router.post("/:id/bot",(req: Request, res: Response)=>{
    res.json({"success":RoomServices.addBot(req.params.id,req.body)})
});

// Modifier les propriétés du BOT
router.put("/:id/bot",(req: Request, res: Response)=>{
    
});

router.post("/:id/bot/:botToken/:action",(req: Request, res: Response)=>{
    const roomId = req.params.id;
    const botToken = req.params.botToken;
    const action = req.params.action;
    
    if (action === "start") {
        RoomServices.startBot(roomId, botToken);
    } else if (action === "connect") {
        RoomServices.connectBot(roomId, botToken);
    } else {
        res.status(400).json({ error: "Invalid action" });
    }
    
    res.json({"success": true});
});


export default router;