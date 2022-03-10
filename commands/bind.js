const fs = require("fs");
const path = require("path");
const config = require("../config.json");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

module.exports = {
    name: "bind",
    description: "Creates the Hall of Fame in the channel where this command is used.",
    usage: `${config.prefix}bind`,
    adminOnly: true,
    async execute(msg, args) {
        if(config.hof_channel) {
            msg.channel.send("There's already an existing Hall of Fame! Please unbind that one first.");
            return;
        }
        if(args.length >= 1) {
            msg.reply(`0 arguments expected but ${args.length} were given. Correct usage: \`${config.prefix}${this.name}\``);
            return;
        }

        const result = await bindHallOfFame(msg.channel.id);
        if(result) {
            msg.channel.send("Hall of Fame created. This channel is now eternalising all pog moments!");
        } else {
            msg.channel.send("Something went wrong while trying to create the Hall of Fame.");
        }
    }
}

// writes the channel id in the config.json file
async function bindHallOfFame(channelId) {
    config.hof_channel = channelId
    
    try {
        await writeFileAsync(path.join(__dirname, "../config.json"), JSON.stringify(config, null, 2));
        return true;
    } catch (error) {
        console.log("couldn't update the config.json file. error: " + error);
        return false;
    }
}