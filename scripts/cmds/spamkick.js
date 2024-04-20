let messageCounts = {};

const spamThreshold = 5;
const spamInterval = 180000;

function clearCount(threadID, senderID) {
  clearTimeout(messageCounts[threadID][senderID].timer);
  delete messageCounts[threadID][senderID];
}

module.exports = {
  config: {
    name: "spamkick",
    aliases: [],
    version: "1.0",
    author: "Jonell Magallanes & BLUE & kshitiz",
    countDown: 5,
    role: 2,
    shortDescription: "Automatically detect and act on spam",
    longDescription: "Automatically detect and act on spam",
    category: "owner",
    guide: "{pn}",
  },

  onStart: async function ({ api, event, args }) {
    api.sendMessage("This command functionality kicks the user when they are spamming in group chats", event.threadID, event.messageID);
  },

  onChat: function ({ api, event }) {
    const { threadID, senderID } = event;

    if (!messageCounts[threadID]) {
      messageCounts[threadID] = {};
    }

    if (!messageCounts[threadID][senderID]) {
      messageCounts[threadID][senderID] = {
        count: 1,
        timer: setTimeout(() => {
          clearCount(threadID, senderID);
        }, spamInterval),
      };
    } else {
      messageCounts[threadID][senderID].count++;
      if (messageCounts[threadID][senderID].count > spamThreshold) {
        api.sendMessage("🛡️ | Detected spamming. The bot will remove the user from the group", threadID);
        api.removeUserFromGroup(senderID, threadID);
        clearCount(threadID, senderID);
      }
    }
  },
};
