const fs = require('fs');

module.exports = {
  config: {
    name: "leaveall",
    aliases: ["outall"],
    version: "1.0",
    author: "OtinXSandip",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: " "
    },
    category: "𝗢𝗪𝗡𝗘𝗥",
    guide: {
      vi: "",
      en: ""
    }
  },
  onStart: async function ({ api, args, message, event }) {
    const approveList = JSON.parse(fs.readFileSync('threads.json', 'utf8'));

    const threadList = await api.getThreadList(100, null, ["INBOX"]);
    const botUserID = api.getCurrentUserID();

    const unapprovedThreads = [];
    
    threadList.forEach(threadInfo => {
      if (threadInfo.isGroup && threadInfo.threadID !== event.threadID && !approveList.includes(threadInfo.threadID)) {
        unapprovedThreads.push(threadInfo.name || threadInfo.threadID);
        api.removeUserFromGroup(botUserID, threadInfo.threadID);
      }
    });

    if (unapprovedThreads.length > 0) {
      const unapprovedMessage = `successfully left all unapproved groups boss🤩`;
      api.sendMessage(unapprovedMessage, event.threadID);
    } else {
      api.sendMessage("No unapproved groups to leave.", event.threadID);
    }
  }
}