const Discord = require("discord.js");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);
const config = require("../config.json");
const storage = require("../storage/storage.json");
const msgPoster = require("../utils/message-poster");
module.exports = {
    name: "vote",
    description: "Draws attention to a message so people can vote on it.",
    usage: `${config.prefix}vote [message id]`,
    adminOnly: false,
    async execute(msg, args) {
        const hof_channel = config.hof_channel;
        // check if hall of fame channel was already created
        if (!hof_channel) {
            msg.channel.send("No existing Hall of Fame channel found. Please create it first.");
            return;
        }
        if (args.length !== 1) {
            msg.reply(`1 argument expected but ${args.length} were given. Correct usage: \`${config.prefix}${this.name} [message id]\``);
            return;
        }

        try {
            var message = await msg.channel.messages.fetch(args[0]);
        } catch (error) {
            console.log(error);
            msg.reply(`Couldn't find post in this channel. Correct usage: \`${config.prefix}${this.name} [message id]\``);
            return;
        }

        // embed for voting started message
        const thumbnail = new Discord.MessageAttachment("../assets/star.png", "star.png");
        const embed = new Discord.MessageEmbed({
            title: "Hall of Fame voting started!",
            color: [212, 175, 55],
            author: { name: "Hall of Fame Bot", iconURL: "attachment://star.png" },
            thumbnail: { url: "attachment://star.png" },
            description: "React with the ⭐ emoji if you think the post is worthy of the Hall of Fame.\n\nVote now: [Original Message](" + message.url + ")"
        });

        msg.channel.send({ embeds: [embed], files: [path.join(__dirname, "../assets/star.png")] });
    }
}