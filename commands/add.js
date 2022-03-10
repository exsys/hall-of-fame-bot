const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);
const config = require("../config.json");
const backup = require("../storage/backup.json");
const msgPoster = require("../utils/message-poster");
module.exports = {
    name: "add",
    description: "Skips the voting and instantly adds the post to the Hall of Fame.",
    usage: `${config.prefix}add [message id]`,
    adminOnly: true,
    async execute(msg, args) {
        if (args.length !== 1) {
            msg.reply(`1 argument expected but ${args.length} were given. Correct usage: \`${config.prefix}${this.name} [message id]\``);
            return;
        }
        
        const hof_channel = config.hof_channel;
        if (!hof_channel) {
            msg.channel.send("No existing Hall of Fame channel found. Couldn't add post.");
            return;
        }

        try {
            var message = await msg.channel.messages.fetch(args[0]);
        } catch (error) {
            console.log(error);
            if (!message) {
                msg.reply(`Couldn't find post in this channel. Correct usage: \`${config.prefix}${this.name} [message id]\``);
            } else {
                msg.channel.send("Error while trying to fetch the message.");
            }
            return;
        }

        msgPoster.postMessage(message);
    }
}