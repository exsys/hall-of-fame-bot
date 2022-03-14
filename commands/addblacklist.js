const config = require("../config.json");
const storage = require("../storage/storage.json");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

module.exports = {
    name: "addblacklist",
    description: "Adds the given channel to the blacklist so the bot doesn't track star reactions in that channel.",
    usage: `${config.prefix}addblacklist [channel id]`,
    adminOnly: true,
    async execute(msg, args) {
        if(args.length !== 1) {
            msg.channel.send(`1 argument expected but ${args.length} were given. Correct usage: \`${config.prefix}${this.name} [channel id]\``);
            return;
        }

        // check if channel actually exists in this discord server
        let channel;
        try {
            channel = await msg.guild.channels.fetch(args[0]);
        } catch (error) {
            msg.channel.send("Couldn't find channel in this server.");
            return;
        }

        try {
            if (!storage.blacklist) storage.blacklist = [];
            storage.blacklist.push(channel.id);
            await writeFileAsync(path.join(__dirname, "../storage/storage.json"), JSON.stringify(storage, null, 2));
            msg.channel.send("Successfully added channel to the blacklist.");
        } catch (error) {
            console.log(error);
            return;
        }
    }
}