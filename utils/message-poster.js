const Discord = require("discord.js");
const config = require("../config.json");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);
const backup = require("../storage/backup.json");

module.exports.postMessage = async (message) => {
    if(!config.hof_channel) return;
    const hofChannel = await message.client.channels.fetch(config.hof_channel);
    const thumbnail = new Discord.MessageAttachment("../assets/star.png", "star.png");

    // embed for hall of fame post
    const embed = new Discord.MessageEmbed({
        title: `Post by ${message.author.username}`,
        color: [212, 175, 55],
        author: { name: "Hall of Fame", iconURL: "attachment://star.png" },
        thumbnail: { url: message.author.displayAvatarURL() },
        description: message.content + "\n\n[Jump to original message](" + message.url + ")",
    });

    hofChannel.send({ embeds: [embed], files: [path.join(__dirname, "../assets/star.png")] });

    // save channel id and message id in case hall of fame channel gets deleted
    try {
        const backupObj = {
            channel_id: message.channel.id,
            message_id: message.id
        };

        if(!backup.hof_posts) backup.hof_posts = [];
        backup.hof_posts.push(backupObj);
        await writeFileAsync(path.join(__dirname, "../storage/backup.json"), JSON.stringify(backup, null, 2));
    } catch (error) {
        console.log(error);
        return;
    }
}