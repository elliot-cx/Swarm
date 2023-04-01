import { PORT } from "../..";
import { Authentification } from "../models/authentification";

var auth: Authentification = {
    service: 'discord', 
    username: 'BlueWhite#2744', 
    token: '6LJPDwGZa8wV7F55ngEtSftf50OWzf', 
    expiration: 1680555557560
}

// Coté client
const discordClientId = 688126093424721954n;
const uri = `localhost:${PORT}/auth`;
const url = `https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&redirect_uri=${encodeURIComponent(uri)}&response_type=token&scope=identify`

export namespace BotAuthentificationService{

    export function getAuthentification() {
        // Check expiration
        if (new Date() > new Date(auth.expiration * 1000)) {
            // On doit rafraichir le token discord
            return null;
        }else{
            return auth;
        }
    }

    export function setAuthentification(authentification: Authentification) {
        auth = authentification;
    }
}