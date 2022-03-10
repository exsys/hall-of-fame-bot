const Discord = require("discord.js");
const fs = require('fs');
const path = require("path");
const config = require("../config.json");
module.exports = {
    name: "help",
    description: "Shows all existing commands and their usage.",
    adminOnly: false,
    execute(msg, args) {
        if (args.length !== 0) {
            msg.reply(`0 arguments expected but ${args.length} were given. Correct usage: ${config.prefix}${this.name}`);
            return;
        }

        const cmdFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js") && file !== "help.js");
        let msgEmbedText = "";
        for (const file of cmdFiles) {
            const cmd = require(`./${file}`);
            msgEmbedText += `\`${cmd.usage}\` ${cmd.description}\n`;
        }

        const thumbnail = new Discord.MessageAttachment("../assets/star.png", "star.png");
        const embed = new Discord.MessageEmbed({
            color: [212, 175, 55],
            author: { name: "Hall of Fame Bot", iconURL: "attachment://star.png" },
            fields: [
                {
                    name: "Bot usage",
                    value: "This bot tracks the amount of ⭐ reactions on all messages and whenever the specified amount has been reached on a message it will be posted in the Hall of Fame.\n"
                },
                {
                    name: "Commands usage",
                    value: `All values have to be written without the [] brackets.\nTo get an id: right click element (e.g. message or role) and click "Copy ID".\n\`${config.prefix}${this.name}\` ${this.description}\n`
                },
                {
                    name: "Commands",
                    value: msgEmbedText
                }
            ],
            footer: { text: "Don't forget to drink water!" }
        });

        msg.channel.send({ embeds: [embed], files: [path.join(__dirname, "../assets/star.png")] });
    }
}