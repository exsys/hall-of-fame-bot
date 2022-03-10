const config = require("../config.json");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

module.exports = {
    name: "minreacts",
    description: "Changes the amount of reactions needed for a message to be included in the Hall of Fame.",
    usage: `${config.prefix}minreacts [amount]`,
    adminOnly: true,
    async execute(msg, args) {
        if(args.length === 0) {
            msg.channel.send(`Reactions needed for Hall of Fame: ${config.reactions_needed}`);
            return;
        }
        if(args.length !== 1) {
            msg.channel.send(`1 argument expected but ${args.length} were given. Correct usage: \`${config.prefix}${this.name} [amount]\``);
            return;
        }
        const value = parseInt(args[0]);
        if (isNaN(value)) {
            msg.reply("Bruh you serious? Give me a number...");
            return;
        }
        if (value < 1) {
            msg.reply("Only values higher than 1 are valid!");
            return;
        }
        if (value === config.reactions_needed) {
            msg.reply("This is already the current value.");
            return;
        }

        config.reactions_needed = value;

        try {
            await writeFileAsync(path.join(__dirname, "../config.json"), JSON.stringify(config, null, 2));
            msg.reply("Successfully changed the minimum amount of votes needed. New value: " + config.reactions_needed);
        } catch (error) {
            console.log(error);
        }
    }
}