/**
 * This module contains functions related to authentication for a swarm bot.
 *
 * @packageDocumentation
 */
import { Authentification } from "../models/authentification";
import { DataService } from "./data";

export namespace BotAuthentificationService{

    /**
     * Gets the current authentication information for the bot.
     *
     * @returns The current authentication information or null if it has expired.
     */
    export function getAuthentification() {
        // Get Auth
        const auth = DataService.getDataInstance("auth") as Authentification
        if (!auth.expiration) return null
        // Check expiration
        if (new Date() > new Date(auth.expiration)) {
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
        if(authentification){
            DataService.updateDataInstance("auth",authentification);
            return true;
        }
        return false;
    }
}