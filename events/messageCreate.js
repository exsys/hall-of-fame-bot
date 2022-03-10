/**
 * @description Listens for all messages that start with the bots prefix and executes the command if it's a valid one.
 * @author Exsys
 */
const config = require("../config.json");
const prefix = config.prefix;
module.exports = {
    name: "messageCreate",
    async execute(msg) {
        if(!msg.content.startsWith(prefix) || msg.author.bot) return;

        // seperate the command from the arguments
        const args = msg.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();

        // read corresponding command file
        try {
            var cmdFile = require(`../commands/${cmd}.js`);    
        } catch (error) {
            //console.log(`couldn't read command file: /commands/${cmd}.js error: ` + error);
            return;
        }

        // check if admin role is needed for that and if yes then check if user got corresponding role. if not: don't execute command
        if (cmdFile.adminOnly) {
            if (!msg.member.roles.cache.some(role => config.admins.some(id => role.id === id))) {
                return;
            }
        }

        cmdFile.execute(msg, args);
    }
}