const supportGC = '6677272875627081';

module.exports = {
  config: {
    name: "inbox",
    aliases: ["in"],
    version: "1.0",
    author: "Muhid",
    countDown: 5,
    role: 2,
    category: "𝗨𝗧𝗜𝗟𝗜𝗧𝗬",
    guide: ""
  },

  onStart: async function ({ api, event, args, usersData, threadsData, getLang }) {
    const { threadID, senderID, isGroup } = event; // Ensure isGroup is available in event

    if (threadID.toString() !== supportGC) {
      return api.sendMessage(' ❌ | This command is only for support group.', threadID);
    } 

    try {
      await api.sendMessage("✅ | You have been accepted. You can use our bot in your inbox", senderID);
      await api.sendMessage('✅ | Check Your Inbox ', threadID);
      
      const senderName = await usersData.getName(senderID);
      const msg = "Inbox Info" +
        `\n- User Name: ${senderName}` +
        `\n- User ID: ${senderID}` +
        (isGroup ? getLang("sendByGroup", (await threadsData.get(threadID)).threadName, threadID) : getLang("sendByUser"));

      await api.sendMessage(msg, supportGC); // Assuming you want to send this message to the support group chat
    } catch (error) {
      console.error('Error sending message:', error); // Log the error for debugging
      api.sendMessage('Skill issue', threadID);
    }
  }
};
