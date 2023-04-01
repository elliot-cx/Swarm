import express, { Request, Response } from "express";
import { BotAuthentificationService } from "../services/botAuthentification";

const router = express.Router();

// Récupérer l'authentification actuelle
router.get('/', (_: Request, res: Response) => {
    res.json({ "success": BotAuthentificationService.getAuthentification() })
});

// Modifier l'authentification
router.post('/', (_: Request, res: Response) => {

});