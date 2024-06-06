const supportGC = '6677272875627081';

module.exports = {
  config: {
    name: "inbox",
    aliases: ["in"],
    version: "1.0",
    author: "Muhid",
    countDown: 5,
    role: 0,
    category: "𝐒𝐔𝐏𝐏𝐎𝐑𝐓 𝐙𝐎𝐍𝐄",
    guide: ""
  },

  onStart: async function ({ api, event, args, usersData, threadsData, getLang }) {
    const { threadID, senderID } = event;

    if (threadID.toString() !== supportGC) {
      return api.sendMessage('❌ | This command is only for support group.', threadID);
    } 

    try {
      await api.sendMessage("✅ | You have been accepted. You can use our bot in your inbox", senderID);
      await api.sendMessage('✅ | Check Your Inbox', threadID);

      const senderName = await usersData.getName(senderID);
      const msg = `Inbox Info\n- User Name: ${senderName}\n- User ID: ${senderID}`;

      await api.sendMessage(msg, '100087855357857'); // Ensure the user ID is a string

    } catch (error) {
      console.error('Error sending message:', error); // Log the error for debugging
      api.sendMessage('Skill issue', threadID);
    }
  }
};
