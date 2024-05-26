const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
  config: {
    name: "mention",
    version: "1.0.0",
    author: "ZERODAY",
    role: 2,
    description: "Mention him if he doesn't listen",
    category: "𝗙𝗨𝗡",
    usages: "{pn} mention",
    countDown: 10
  },

  onStart: async function ({ api, args, Users, event }) {
    var mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage("Need to tag 1 user whom you want to start mention", event.threadID);
    
    let name = event.mentions[mention];
    let arrayTag = [{ id: mention, tag: name }];
    let a = function (message) { api.sendMessage(message, event.threadID); }
   
    const messageIntervals = [3000, 4500, 6000, 7500, 9000, 10500, 12000, 13500, 15000, 16500, 18000, 19500, 21000, 22500, 24000, 25500, 27000, 28500, 30000, 31500, 33000, 34500, 36000, 37500, 39000, 40500];

    for (let interval of messageIntervals) {
      setTimeout(() => {
        a({ body: `${name}`, mentions: arrayTag });
      }, interval);
    }
  }
};
