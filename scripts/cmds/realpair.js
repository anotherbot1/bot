const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
        name: "realpair",
        aliases: ["realpair"],
        version: "1.0",
        author: "ZERODAY",
        countDown: 5,
        role: 0,
        shortDescription: "",
        longDescription: "",
        category: "𝗙𝗨𝗡",
    },
  onStart: async function ({ api, event, args, usersData, threadsData }) {
    return api.sendMessage(
      {
        body: `no one loves you :( `,
      },
      event.threadID,
      event.messageID
    );
  },
};
