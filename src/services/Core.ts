import {Client as Bot, Client, ClientOptions} from "discord.js";
import {CommandsHandler} from "./handlers/CommandsManager";
import {EventsHandler} from "./handlers/EventManager";
import * as settings from "../services/Settings"
import { createLogger } from "../services/handlers/LoggingHandler"
import {resolve} from "path";

export class Core extends Bot {
    public readonly settings = settings
    public readonly logger = createLogger()
}