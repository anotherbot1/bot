module.exports.config = {
  name: "hornypickuplines",
  version: "1.0.0",
  hasPermission: 0,
  credits: "", 
  description: "Random horny pickuplines",
  commandCategory: "love",
  usages: "hornypickuplines",
  cooldowns: {
    default: 0,
    per: "command"
  },
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async ({ api, event, args, Users, getText }) => {
  const axios = require("axios");
  const request = require("request");
  const fs = require("fs-extra");

  var msg = [
    "Are you a parking ticket? Because you’re fine",
    "Aside from being hot, what do you do for a living?",
    "Did you just come out of the oven? Because you’re burning hot.",
    "Sorry—were you talking to me? No? Would you like to?"
  ];

  var know = Math.floor(Math.random() * msg.length);

  return api.sendMessage(msg[know], event.threadID, event.messageID);
};

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
    "successText": "hi thành công",
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "command has been started",
  }
};
