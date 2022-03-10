const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);
const config = require("../config.json");
const storage = require("../storage/storage.json");
const msgPoster = require("../utils/message-poster");
var checking = false;

module.exports = {
    name: "messageReactionAdd",
    async execute(msgReaction, user) {
        if (msgReaction.emoji.name !== "⭐") return; // only check star reactions
        const message = await msgReaction.message;
        const msgId = message.id;

        let reactionCount = msgReaction.count;
        // if for whatever unexpected reason msgReaction doesn't exist.
        if(!reactionCount) {
            msgReaction.message.channel.send("Unknown error. Call Exsys and tell him he coded trash.");
            return;
        }

        // if it's the first reaction then add that message to the currently tracked messages. this is basically like starting a vote
        if (reactionCount === 1) {
            try {
                if (!storage.currentlyTracking) storage.currentlyTracking = []; // in case array was deleted for whatever reason
                storage.currentlyTracking.push(msgId);
                await writeFileAsync(path.join(__dirname, "../storage/storage.json"), JSON.stringify(storage, null, 2));
            } catch (error) {
                console.log(error);
                msgReaction.message.channel.send("Something went wrong while trying to track the message. Please try again.");
                return;
            }
        }

        // if message gets enough reacts it will be posted in the hall of fame channel
        if (reactionCount >= config.reactions_needed) {
            const tracking = storage.currentlyTracking.some(id => id === msgId);
            if(tracking && !checking) {
                checking = true;
                msgPoster.postMessage(message);

                // remove message from tracked messages
                try {
                    const newTrackingArr = storage.currentlyTracking.filter((value, index, arr) => {
                        return value !== msgId;
                    });
                    storage.currentlyTracking = newTrackingArr;

                    await writeFileAsync(path.join(__dirname, "../storage/storage.json"), JSON.stringify(storage, null, 2));
                    checking = false;
                } catch (error) {
                    console.log(error);
                    msgReaction.message.channel.send("Uhh... I think there's something wrong... Or not? I dunno man I just execute the commands.");
                    return;
                }
            }
        }
    }
}