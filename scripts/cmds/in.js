module.exports = {
  config: {
    name: "in",
    version: "1.0.0",
    permission: 0,
    credits: "Nayan",
    description: "Inbox",
    category: "𝗜𝗡𝗙𝗢",
    cooldowns: 5
  },

  onStart: async function ({ message, event, args, getLang }) {
    try {
      let uid;
      if (event.type === "message_reply") {
        uid = event.messageReply.senderID;
      } else if (Object.keys(event.mentions).length > 0) {
        uid = Object.keys(event.mentions)[0];
      } else {
        uid = event.senderID;
      }

      let name = await Users.getNameUser(uid);
      const msg = {
        text: `Name: ${name}\nID: ${uid}`
      };

      if (typeof message.sendContact === 'function') {
        await message.sendContact(msg, uid, event.threadID, event.messageID);
      } else {
        console.error("sendContact is not a function on message object");
      }
    } catch (error) {
      console.error("An error occurred in the start function:", error);
    }
  }
};
