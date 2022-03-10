const config = require("../config.json");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);
module.exports = {
    name: "addadmin",
    description: "Adds the given role to the admin group. Admins can use all commands.",
    usage: `${config.prefix}addadmin [role id]`,
    adminOnly: true,
    async execute(msg, args) {
        if (args.length !== 1) {
            msg.channel.send(`1 argument expected but ${args.length} were given. Correct usage: \`${config.prefix}${this.name} [role id]\``);
            return;
        }

        try {
            var role = await msg.guild.roles.fetch(args[0]);
            if (!role) {
                msg.reply("Couldn't find given role in this server.");
                return;
            }
        } catch (error) {
            console.log(error);
            msg.reply("Couldn't find given role in this server.");
            return;
        }

        try {
            config.admins.push(role.id);
            await writeFileAsync(path.join(__dirname, "../config.json"), JSON.stringify(config, null, 2));
            msg.channel.send("Successfully added role to admin group.");
        } catch (error) {
            console.log("Error while trying to add new admin role.");
            msg.channel.send("There was an error while trying to save the new admin role. Please try again.");
            return;
        }

    }
}