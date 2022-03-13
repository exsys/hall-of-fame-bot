require('dotenv').config();
const fs = require('fs');
const { Client, Intents } = require('discord.js');

// Create client instance needed for newer versions of discord.js
const client = new Client({
    intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS ],
    partials: [ "MESSAGE", "CHANNEL", "REACTION"],
    allowedMentions: { parse: ["users"] }
});

// read files for defined events. for example when someone sends a message.
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

// registers all events in the events directory and starts listening for them.
for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.once("ready", bot => {
    client.user.setPresence({
        status: "online",
        activities: [
            { name: "Eternalizing Pog moments" }
        ]
    })
    console.log("Bot is running");
});

client.login(process.env.BOT_TOKEN);