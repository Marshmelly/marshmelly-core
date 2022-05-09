import { Client as OClient, ClientEvents, Guild as OGuild } from "discord.js";

export interface EventComponent {
    meta: {
        name: keyof ClientEvents;
    }
}