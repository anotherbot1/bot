module.exports = {
  config: {
    name: "preuser",
    aliases: ["premiumuser", "plink"],
    version: "1.0",
    author: "ZERODAY",
    countDown: 5,
    role: 0,
    shortDescription: "Register as a premium user",
    longDescription: "This command provides a link to a Google Form for registration as a premium user.",
    category: "𝐒𝐔𝐏𝐏𝐎𝐑𝐓 𝐙𝐎𝐍𝐄",
  },
  onStart: async function ({ api, event }) {
    try {
      const uid = ["100087855357857"];
      const message = `${event.senderID} wants to join your bot father box, uid: ${uid.join(", ")}`;
      await api.sendMessage(message, event.threadID);
      
      const text = "For being a premium user of ZERODAY bot, first submit the registration form \n\n link: https://forms.gle/aPYm6E4ypeJ2rGLv5. \n\n After submitting all information, kindly reply to this message with Done, Complete or ok etc.";
      const messageInfo = await api.sendMessage(text, event.threadID);

      global.GoatBot.onReply.set(messageInfo.messageID, {
        commandName: this.config.name,
        author: event.senderID,
        messageID: messageInfo.messageID
      });
    } catch (error) {
      console.error("Error sending initial message:", error);
    }
  },
  
  onReply: async function ({ api, event, Reply }) {
    try {
      const { author } = Reply;
      const validReplies = ["done", "complete", "ok"];
      if (!validReplies.includes(event.body.trim().toLowerCase())) {
        return;
      }
      const supportGroupId = "8557322960951176";
      const threadID = event.threadID;

      if (threadID === supportGroupId) {
        await api.sendMessage("⚠ | You are already in the PREMIUM group.", threadID);
      } else {
        await api.addUserToGroup(event.senderID, supportGroupId);
        await api.sendMessage("✅ | You have been added to the PREMIUM group.", threadID);
      }
    } catch (error) {
      console.error("Error processing reply:", error);
      if (error.message.includes("Action blocked")) {
        await api.sendMessage("❌ | Sorry, you can't be added to the group because of group settings.", event.threadID);
      } else {
        await api.sendMessage("❌ | An error occurred while processing your request.", event.threadID);
      }
    }
  }
};
