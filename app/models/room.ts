import { Bot } from './bots/Bot';

export interface room{
    id: string,
    name: string,
    type: string,
    nbPlayers: number,
    isActive: boolean,
    link: string,
    bots: Bot[];
}