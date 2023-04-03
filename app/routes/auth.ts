import express, { Request, Response } from "express";
import { BotAuthentificationService } from "../services/botAuthentification";

const router = express.Router();

// Get current used auth system
router.get('/', (_: Request, res: Response) => {
    res.json({ "success": BotAuthentificationService.getAuthentification() });
});

// Update auth informations
router.post('/', (req: Request, res: Response) => {
    res.json({"sucess": BotAuthentificationService.setAuthentification(req.body)});
});

export default router;