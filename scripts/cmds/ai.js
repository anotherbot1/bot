const axios = require('axios');

module.exports = {
  config: {
    name: "ai",
    version: "2.0",
    author: "OtinXSandip",
    description: "ai",
    category: "𝗔𝗜",
    guide: {
      en: "{p}{n} <Query>",
    },
  },
  onStart: async function ({ message, usersData, event, api, args }) {
    try {
      const id = event.senderID;
      const userData = await usersData.get(id);
      const name = userData.name;

      const ment = [{ id: id, tag: name }];
      const prompt = args.join(" ");
      const encodedPrompt = encodeURIComponent(prompt);
      api.setMessageReaction("⏰", event.messageID, () => { }, true);
      const res = await axios.get(`https://sandipapi.onrender.com/gpt?prompt= ${encodedPrompt}`);
      const result = res.data.answer;

      api.setMessageReaction("✅", event.messageID, () => { }, true);
      message.reply({
        body: `${name} ${result}`,
        mentions: ment,
      }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
  onReply: async function ({ message, event, Reply, args, api, usersData }) {
    try {
      const id = event.senderID;
      const userData = await usersData.get(id);
      const name = userData.name;

      const ment = [{ id: id, tag: name }];
      const prompt = args.join(" ");
      const encodedPrompt = encodeURIComponent(prompt);      api.setMessageReaction("⏰", event.messageID, () => { }, true);
      const res = await axios.get(`https://sandipapi.onrender.com/gpt?prompt=${encodedPrompt}`);
      const result = res.data.answer;

      api.setMessageReaction("✅", event.messageID, () => { }, true);
      message.reply({
        body: `${name} \n${result}`,
        mentions: ment,
      }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};