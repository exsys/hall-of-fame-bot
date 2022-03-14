const config = require("../config.json");
const storage = require("../storage/storage.json");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

module.exports = {
    name: "rmblacklist",
    description: "Removes the given channel from the blacklist.",
    usage: `${config.prefix}rmblacklist [channel id]`,
    adminOnly: true,
    async execute(msg, args) {
        if(args.length !== 1) {
            msg.channel.send(`1 argument expected but ${args.length} were given. Correct usage: \`${config.prefix}${this.name} [channel id]\``);
            return;
        }

        const newArray = storage.blacklist.filter((value, index, arr) => {
            return value !== args[0];
        });

        storage.blacklist = newArray;

        try {
            if (!storage.blacklist) storage.blacklist = [];
            await writeFileAsync(path.join(__dirname, "../storage/storage.json"), JSON.stringify(storage, null, 2));
            msg.reply("Successfully removed channel from blacklist.");
        } catch (error) {
            console.log(error);
            msg.channel.send("There was an error while trying to remove the channel from the blacklist. Please try again.");
            return;
        }
    }
}