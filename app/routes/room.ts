import express, { Request, Response } from "express";
import { RoomServices } from "../services/room";
import { JklmService } from "../services/jklm";
import { BotAction } from "../models/bots/Bot";
import { RoomMapper } from "../models/mappers/RoomMapper";

const router = express.Router();

// Récupère toutes les rooms instanciées
router.get("/", async (req: Request, res: Response) => {
    const provider = req.query.provider as string;
    if (provider == "JKLM") {
        res.json({ "success": RoomMapper.getDtoFromJKLMRoomResponse(await JklmService.getAllRoomsFromJKLM())});
    }else{
        res.json({ "success": RoomServices.getAllRooms() });
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
router.put("/:id/bot/:botToken", (req: Request, res: Response) => {
    res.json({"success" : RoomServices.updateBot(req.params.id, req.params.botToken, req.body)})
});

router.get("/:id/bot/:botToken/:action", (req: Request, res: Response) => {
    const roomId:string = req.params.id;
    const botToken:string = req.params.botToken;
    const action:BotAction = req.params.action as BotAction;

    res.json({ "success": RoomServices.manageBot(roomId,botToken,action)});
});

router.get("/:id/:action", (req: Request, res: Response) =>{
    const roomId:string = req.params.id;
    const action:BotAction = req.params.action as BotAction;

    res.json({ "success": RoomServices.manageRoomBots(roomId,action)});
});

export default router;