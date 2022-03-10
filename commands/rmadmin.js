const config = require("../config.json");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);
module.exports = {
    name: "rmadmin",
    description: "Removes the given role from the admin group.",
    usage: `${config.prefix}rmadmin [role id]`,
    adminOnly: true,
    async execute(msg, args) {
        if (args.length !== 1) {
            msg.channel.send(`1 argument expected but ${args.length} were given. Correct usage: \`${config.prefix}${this.name} <amount>\``);
            return;
        }

        // check if role actually is in admin group
        if (!config.admins.some(id => id === args[0])) {
            msg.reply("Given role isn't an admin role.");
            return;
        }

        // remove role from admin group
        const newArray = config.admins.filter((value, index, arr) => {
            return value !== args[0];
        });

        if(newArray.length === 0) {
            msg.reply("Atleast 1 role has to be in the admin group. Cancelled execution.");
            return;
        }
        config.admins = newArray;

        try {
            await writeFileAsync(path.join(__dirname, "../config.json"), JSON.stringify(config, null, 2));
            msg.reply("Successfully removed role from admin group.")
        } catch (error) {
            console.log(error);
            msg.channel.send("There was an error while trying to remove the role. Please try again.");
            return;
        }
    }
}