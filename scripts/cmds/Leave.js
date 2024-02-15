module.exports = {
  config: {
    name: "Leave",
    aliases: ["out"],
    version: "1.0",
    author: "AL-Rulex(loufi)",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "",
      en: " 😌"
    },
    longDescription: {
      vi: "",
      en: " "
    },
    category: "𝗢𝗪𝗡𝗘𝗥",
    guide: {
      vi: "",
      en: "{pn} or {pn} <reason>"
    }
  },
  onStart: async function ({ api, args, message, event }) {
    
    const groupId = args[0];
    if (isNaN(groupId)) {
api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
      return;
    }
    const messageToSend = args.join(" ");
    api.sendMessage(messageToSend, groupId);
    api.removeUserFromGroup(api.getCurrentUserID(), groupId);
  }
}