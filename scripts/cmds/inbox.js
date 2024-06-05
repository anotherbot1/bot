const supportGC = '6677272875627081';

module.exports = {
  config: {
    name: "inbox",
    aliases: ["in"],
    version: "1.0",
    author: "Muhid",
    countDown: 5,
    role: 0,
    category: "𝗨𝗧𝗜𝗟𝗜𝗧𝗬",
    guide: ""
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, senderID } = event;

    if (threadID.toString() !== supportGC) {
      return api.sendMessage('This is a support group chat.', threadID);
    }

    try {
      await api.sendMessage("✅ | You have been accepted. You can use our bot in your inbox", senderID);
      await api.sendMessage('✅ | Check Your Inbox ', threadID);
    } catch (error) {
      api.sendMessage('Skill issue', threadID);
    }
  }
};
