/**
 * This module contains functions related to authentication for a swarm bot.
 *
 * @packageDocumentation
 */
import { PORT } from "../..";
import { Authentification } from "../models/authentification";

var auth: Authentification = {
    service: 'discord', 
    username: 'BlueWhite#2744', 
    token: '6LJPDwGZa8wV7F55ngEtSftf50OWzf', 
    expiration: 1680555557560
}

// Front side
const discordClientId = 688126093424721954n;
const uri = `localhost:${PORT}/auth`;
const url = `https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&redirect_uri=${encodeURIComponent(uri)}&response_type=token&scope=identify`

export namespace BotAuthentificationService{

    /**
     * Gets the current authentication information for the bot.
     *
     * @returns The current authentication information or null if it has expired.
     */
    export function getAuthentification() {
        // Check expiration
        if (new Date() > new Date(auth.expiration * 1000)) {
            // On doit rafraichir le token discord
            return null;
        }else{
            return auth;
        }
    }

    /**
     * Sets the authentication information for the bot.
     *
     * @param authentification - The new authentication information for the bot.
     */
    export function setAuthentification(authentification: Authentification) {
        auth = authentification;
    }
}