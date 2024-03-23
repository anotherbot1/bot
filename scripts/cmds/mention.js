module.exports = {
  config: {
    name: "mencheck", // You can choose any name for this command
    version: "1.0",
    author: "Muhid",
    countDown: 5,
    role: 0, // Can be used by anyone
    shortDescription: {
      en: "Replies with 'Hello darling' when mentioned"
    },
    longDescription: {
      en: "This command makes the bot reply with 'Hello darling' when it is mentioned in a group chat."
    },
    category: "no prefix", // This command doesn't need a prefix
    guide: {
      en: "" // No specific guide needed
    }
  },
  onStart: async function ({ api, event, args }){},
  onChat: async function ({ message, event, api }) {
     const botID = api.getCurrentUserID();
    if (event.mentions[botID] && Object.keys(event.mentions).length > 0) {
      // The bot is mentioned
      message.reply("Hello! How can I help you? 😊");
    }
  }
};
