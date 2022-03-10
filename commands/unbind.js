const fs = require("fs");
const path = require("path");
const config = require("../config.json");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

module.exports = {
    name: "unbind",
    description: "Removes the Hall of Fame.",
    usage: `${config.prefix}unbind`,
    adminOnly: true,
    execute(msg, args) {
        if(!config.hof_channel) {
            msg.channel.send("No existing Hall of Fame channel found.");
            return;
        }
        if(args.length !== 0) {
            msg.reply(`0 arguments expected but ${args.length} were given. Correct usage: \`${config.prefix}${this.name}\``);
            return;
        }

        const result = unbindHallOfFame();
        if(result) {
            msg.channel.send("Successfully unbinded the Hall of Fame channel.");
        } else {
            msg.channel.send("Something went wrong when trying to unbind the Hall of Fame channel...");
        }
    }
}

async function unbindHallOfFame() {
    config.hof_channel = undefined;

    try {
        await writeFileAsync(path.join(__dirname, "../config.json"), JSON.stringify(config, null, 2));
        return true;
    } catch (error) {
        console.log("couldn't update the config.json file. error: " + error);
        return false;
    }
}