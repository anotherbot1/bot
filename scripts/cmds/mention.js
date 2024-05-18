const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
    name: "mention",
    version: "1.0.0",
    author: "ZERODAY",
    hasPermssion: 2,
    description: "Mention him if he doesn't listen",
    commandCategory: "𝗙𝗨𝗡",
    usages: "{pn} mention",
    cooldowns: 10,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.onStart = async function({ api, args, Users, event }) {
    try {
        const mention = Object.keys(event.mentions)[0];
        if (!mention) {
            return api.sendMessage("Need to tag 1 user whom you want to start mention", event.threadID);
        }

        const name = event.mentions[mention];
        const arraytag = [{ id: mention, tag: name }];

        const sendMentionMessage = (message, delay) => {
            setTimeout(() => {
                api.sendMessage({ body: message, mentions: arraytag }, event.threadID);
            }, delay);
        };

        const intervals = [0, 3000, 5000, 7000, 9000, 11000, 13000, 15000, 17000, 19000, 20000, 21500, 24000, 26000, 28000, 30000, 32000, 35000, 37000, 40000, 42000, 46000, 48000, 51000, 54000, 57000, 59000];
        intervals.forEach((interval, index) => {
            const message = index === 0 ? "hi" : `hi ${name}`;
            sendMentionMessage(message, interval);
        });

    } catch (error) {
        console.error("An error occurred while sending mentions:", error);
        api.sendMessage("An error occurred while sending mentions. Please try again later.", event.threadID);
    }
};
