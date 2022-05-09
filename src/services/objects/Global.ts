import { Client as OClient, ClientEvents, Guild as OGuild } from "discord.js";

declare module "discord.js" {
    export interface Client extends OClient {
        
    }
}