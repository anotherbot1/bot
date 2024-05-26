module.exports = {
  config: {
    name: "in",
    aliases: ["in"],
    version: "1.0",
    author: "ZERODAY", // do not change or modify credit
    countDown: 5,
    role: 0,
    shortDescription: "you can see your profile",
    longDescription: "you can see your profile by this command",
    category: "𝗜𝗡𝗙𝗢",
    guide: {
      en: "{pn}",
    },
  },

  onStart: async function({ api, event, usersData }) {
    try {
      let uid;
      if (event.type === "message_reply") {
        uid = event.messageReply.senderID;
      } else if (Object.keys(event.mentions).length > 0) {
        uid = Object.keys(event.mentions)[0];
      } else {
        uid = event.senderID;
      }

      let name = await usersData.getName(uid);
      const msg = `𝗡𝗔𝗠𝗘: ${name}\n𝗜𝗗: ${uid}`;
      await api.sendMessage(msg, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error in onStart function:", error);
      await api.sendMessage("An error occurred while fetching the profile information.", event.threadID);
    }
  }
};
