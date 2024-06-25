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
    await api.sendMessage("For being a premium user of ZERODAY bot, first submit the registration form \n link: https://forms.gle/aPYm6E4ypeJ2rGLv5. \n After submitting all information, kindly reply to this message with Done, Complete or ok etc.",
      event.threadID,
      async (error, info) => {
        if (error) return console.error(error);
      }
    );
  },
  onReply: async function ({ api, event, message, args }) {
    const validReplies = ["done", "Done", "complete", "Complete", "okay", "Okay", "ok", "Ok", "okey", "Okey"];
    const supportGroupId = "8557322960951176";

    if (validReplies.includes(event.body)) {
      if (event.threadID === supportGroupId) {
        api.sendMessage("⚠️ | You are already in the support group.", event.threadID);
      } else {
        try {
          await api.addUserToGroup(event.senderID, supportGroupId);
          api.sendMessage("✅ | You have been added to the support group.", event.threadID);
        } catch (error) {
          if (error.message.includes("Action blocked")) {
            api.sendMessage("❌ | Sorry, you can't be added to the group because of group settings.", event.threadID);
          } else {
            console.error(error);
            api.sendMessage("❌ | An error occurred while processing your request.", event.threadID);
          }
        }
      }
    }
  }
};
