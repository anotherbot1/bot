const { threadsData: globalThreadsData } = global.db;

module.exports = {
  config: {
    name: "addbot",
    version: "1.0",
    author: "Muhid",
    role: 2,
    shortDescription: "Add user to all bot groups",
    longDescription: "Add a user to all groups where the bot is present.",
    category: "𝗢𝗪𝗡𝗘𝗥",
    guide: {
      en: "{pn} <uid>"
    }
  },

  onStart: async function ({ message, event, args, api }) {
    const permission = ["100081646431766"]; // Replace with your admin user ID
    if (!permission.includes(event.senderID)) {
      return message.reply("You don't have permission to use this command.");
    }

    const uidToAdd = args[0];
    if (!uidToAdd || isNaN(uidToAdd)) {
      return message.reply("Please provide a valid user ID.");
    }

    try {
      const allThreads = await globalThreadsData.getAll();
      const addedToGroups = [];
      const failedToAdd = [];

      for (const thread of allThreads) {
        try {
          await api.addUserToGroup(uidToAdd, thread.threadID);
          addedToGroups.push(thread.threadID);
        } catch (error) {
          failedToAdd.push({ threadID: thread.threadID, error: error.message });
        }
      }

      message.reply(
        `✅ Added user with ID ${uidToAdd} to ${addedToGroups.length} groups.` +
        (failedToAdd.length > 0 ? 
          `\n\n❌ Failed to add to ${failedToAdd.length} groups:\n` + 
          failedToAdd.map(f => `- ${f.threadID}: ${f.error}`).join("\n") : 
          "")
      );

    } catch (error) {
      console.error("Error in addbot command:", error);
      message.reply("An error occurred while processing the command.");
    }
  }
};
