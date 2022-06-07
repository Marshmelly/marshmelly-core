import {Client as Bot} from "discord.js";
import {CommandsHandler} from "./handlers/CommandsManager";
import {EventsHandler} from "./handlers/EventManager";
import * as settings from "../services/Settings"
import { createLogger } from "../services/handlers/LoggingHandler"
import {resolve} from "path";

export class Core extends Bot {
    public readonly settings = settings
    public readonly logger = createLogger(settings.branding.Brand_Name, false)
    public disabled_commands = 0
}