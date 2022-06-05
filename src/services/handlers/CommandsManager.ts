import { Collection, Snowflake, Message, TextChannel } from "discord.js";
import { CommandComponent } from "../objects/Command";
import { Core } from "../Core";
import { parse, resolve } from "path";
import { promises as fs } from "fs";

export class CommandsHandler extends Collection<string, CommandComponent> {
    public readonly aliases: Collection<string, string> = new Collection();
    public readonly cooldowns: Collection<string, Collection<Snowflake, number>> = new Collection();

    public constructor(public client: Core, public readonly path: string) { super(); }
    
    public load(): void {
        fs.readdir(resolve(this.path))
            .then(async files => {
                for (const file of files) {
                    const path = resolve(this.path, file);
                    const command = await this.import(path, this.client, {path});
                }
            })
    }

    public async import(path:string, ...args:any[]): Promise<CommandComponent | undefined> {
        const file = (await import(resolve(path)).then(m => m[parse(path).name]));
        return file ? new file(...args) : undefined;
    }
}