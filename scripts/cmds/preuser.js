const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
        name: "preuser",
        aliases: ["preuser","premiumuser","plink"],
        version: "1.0",
        author: "ZERODAY",
        countDown: 5,
        role: 0,
        shortDescription: "Registering as a premium user",
        longDescription: "Using this command will provide you with a link to a Google Form. Once you submit the form, the bot will add you to the premium user group.",
        category: "𝐒𝐔𝐏𝐏𝐎𝐑𝐓 𝐙𝐎𝐍𝐄",
    },
  onStart: async function ({ api, event, args, usersData, threadsData }) {
    return api.sendMessage(
      {
        body: `For being premium user of ZERODAY bot at first Submit the registration form 
        link : (null)`,
      },
      event.threadID,
      event.messageID
    );
  },
};
