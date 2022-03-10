const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);
const config = require("../config.json");
module.exports = {
    name: "prefix",
    description: "Changes the prefix of the bot",
    usage: `${config.prefix}prefix [new prefix]`,
    adminOnly: true,
    async execute(msg, args) {
        if (args.length !== 1) {
            msg.reply(`1 arguments expected but ${args.length} were given. Correct usage: \`${config.prefix}${this.name}\``);
            return;
        }

        try {
            config.prefix = args[0];
            await writeFileAsync(path.join(__dirname, "../config.json"), JSON.stringify(config, null, 2));
            msg.reply(`Successfully changed prefix. New prefix: ${config.prefix}`);
        } catch (error) {
            msg.reply("There was an error while trying to override the prefix. Please try again.");
            return;
        }
    }
}