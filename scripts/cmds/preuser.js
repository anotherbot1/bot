const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "preuser",
    aliases: ["preuser", "premiumuser", "plink"],
    version: "1.0",
    author: "ZERODAY",
    countDown: 5,
    role: 0,
    shortDescription: "Registering as a premium user",
    longDescription: "Using this command will provide you with a link to a Google Form. Once you submit the form, the bot will add you to the premium user group.",
    category: "𝐒𝐔𝐏𝐏𝐎𝐑𝐓 𝐙𝐎𝐍𝐄",
  },
  onStart: async function ({ api, event, args, usersData, threadsData }) {
    await api.sendMessage({
      body: `For being a premium user of ZERODAY bot, first submit the registration form link: https://forms.gle/aPYm6E4ypeJ2rGLv5. After submitting all information, kindly reply to this message with "done", "complete", "ok", etc.`,
    }, event.threadID, async (error, info) => {
      if (error) return console.error(error);
      
      // Listen for replies
      api.listenMqtt((err, message) => {
        if (err) return console.error(err);

        // Check if the message is a reply to the registration message
        if (message.body.toLowerCase().match(/done|complete|ok|okay|okey/i)) {
          const supportGroupId = "8557322960951176";
          
          if (message.threadID === supportGroupId) {
            api.sendMessage("⚠️ | You are already in the support group.", message.threadID);
          } else {
            api.addUserToGroup(message.senderID, supportGroupId).then(() => {
              api.sendMessage("✅ | You have been added to the support group.", message.threadID);
            }).catch((error) => {
              if (error.message.includes("Action blocked")) {
                api.sendMessage("❌ | Sorry, you can't be added to the group because of group settings.", message.threadID);
              } else {
                console.error(error);
                api.sendMessage("❌ | An error occurred while processing your request.", message.threadID);
              }
            });
          }
        }
      });
    });
  }
};
