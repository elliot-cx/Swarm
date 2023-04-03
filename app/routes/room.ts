import express, { Request, Response } from "express";
import { RoomServices } from "../services/room";
import { BotAction } from "../models/bots/Bot";

const router = express.Router();

// Récupère toutes les rooms instanciées
router.get("/", async (req: Request, res: Response) => {
    const provider = req.query.provider as string;
    if (provider == "JKLM") {
        res.json(await RoomServices.getAllRoomsFromJKLM());
    }else{
        res.json(RoomServices.getAllRooms());
    }
});

// Créer une room
router.post("/", async (req: Request, res: Response) => {
    res.json({ "success": await RoomServices.createRoom(req.body) });
});


// Récupère une room avec son ID
router.get("/:id", (req: Request, res: Response) => {
    res.json({ "success": RoomServices.getRoomByID(req.params.id) });
});

// Supprimer une room
router.delete("/:id", (req: Request, res: Response) => {
    res.json({ "success": RoomServices.deleteRoomByID(req.params.id) });
});

// ---------------- BOT -------------------

router.post("/:id/bot", (req: Request, res: Response) => {
    res.json({ "success": RoomServices.addBot(req.params.id, req.body) })
});

// Modifier les propriétés du BOT
router.put("/:id/bot", (req: Request, res: Response) => {
    
});

router.post("/:id/bot/:botToken/:action", (req: Request, res: Response) => {
    const roomId:string = req.params.id;
    const botToken:string = req.params.botToken;
    const action:BotAction = req.params.action as BotAction;

    res.json({ "success": RoomServices.manageBot(roomId,botToken,action)});
});


export default router;