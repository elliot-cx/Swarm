import Bot from  './Bot/SpamBot';
export type Room = {
    id: string,
    name: string,
    type: string,
    nbPlayers: number,
    isActive: boolean,
    link: string,
    bots:Bot[]
}