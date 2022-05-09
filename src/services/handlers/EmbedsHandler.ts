import { MessageEmbed } from "discord.js";
import { Url } from "url";

type ColorsType = "info" | "warn" | "error";

const hexColors: Record<ColorsType, string> = {
    info: "#0000FF",
    warn: "#FFFF00",
    error: "#FF0000"
};

export function CreateEmbed(type:ColorsType, title:string, footer:string, message?:string, links?:string[], icon?:string, image?:string): MessageEmbed {
    const embed = new MessageEmbed()

    if (message) embed.setDescription(message);
    if (footer && icon) embed.setFooter({text:footer, iconURL:icon});
    if (footer && !icon) embed.setFooter({text:footer});
    if (title) embed.setTitle(title);
    if (image) embed.setImage(image);

    if (links) {
        for (let i = 0; i < links.length; i++) {
            embed.setDescription(embed.description + "\n``" + links[i] + "``")
        }
    }

    return embed;
}