const fs = require("fs");
const jimp = require("jimp");
const axios = require("axios");
const request = require("request");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "info",
    version: "1.0",
    author: "Itachi",
    countDown: 5,
    role: 0,
    shortDescription: "Admin and Bot information",
    longDescription: "Admin and Bot information",
    category: "Information",
    guide: {
      en: "{p}{n}",
    },
  },
 
  onStart: async function({ api, event, threadID })  {
    const time = process.uptime(),
          hours = Math.floor(time / (60 * 60)),
          minutes = Math.floor((time % (60 * 60)) / 60),
          seconds = Math.floor(time % 60);

    var juswa = moment.tz("Asia/Dhaka").format("ã€ŽD/MM/YYYYã€ ã€hh:mm:ssã€‘");

    var callback = () => api.sendMessage({
      body: `ADMIN AND BOT INFORMATION 

BOT NAME : Z E R O D A Y BOT
FACEBOOK : https://www.facebook.com/zeroday.was.hacker
BOT PREFIX : ${this.config.prefix}
BOT OWNER : ZERODAY
TIME : ${juswa} 
BOT IS RUNNING ${hours}:${minutes}:${seconds}.

THANKS FOR USING Z E R O D A Y BOT`
    });

    callback();
  }
};
