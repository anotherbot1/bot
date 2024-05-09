const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "info",
    version: "1.0",
    author: "ZERODAY",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Sends information about the bot and admin "
    },
    longDescription: {
      vi: "",
      en: "Sends information about the bot and admin "
    },
    category: "𝗜𝗡𝗙𝗢",
    guide: {
      en: "{pn}"
    },
    envConfig: {}
  },

  onStart: async function ({ message }) {
    const botName = "ZERODAY BOT";
    const botPrefix = "/";
    const authorName = "ZERODAY";
    const authorFB = "https://www.facebook.com/zeroday.was.hacker";
    const authorInsta = "https://www.instagram.com/user_died_8_8/";
    const status = "Who cares!!";
    const now = moment().tz('Asia/Dhaka');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

    message.reply({
      body: `===「 Bot & Owner Info 」===\n❏Bot Name: ${botName}\n❏Bot Prefix: ${botPrefix}\n❏Name: ${authorName}\n❏Facebook: ${authorFB}\n❏Instagram: ${authorInsta}\n❏Status: ${status}\n❏Date: ${date}\n❏Time: ${time}\n❏Uptime: ${uptimeString}\n=====================`
    });
  },

  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "info") {
      this.onStart({ message });
    }
  }
};
