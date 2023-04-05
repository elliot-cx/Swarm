import Bot from  './Bot/Bot';
export default interface Room{
    id: string,
    name: string,
    type: string,
    nbPlayers: number,
    isActive: boolean,
    link: string,
}