const axios = require('axios');

module.exports = {
  config: {
    name: "chat",
    version: "1.1",
    author: "Muhid",
    countDown: 5,
    role: 0,
    shortDescription: "Chat with Simsimi",
    longDescription: "Enable Simsimi mode to chat or directly ask a question.",
    category: "𝗙𝗨𝗡",
    guide: {
      en: "{pn} [on | off]: Turn Simsimi mode on/off\n{pn} <message>: Ask Simsimi directly",
    },
  },

  langs: {
    en: {
      turnedOn: "✅ chat mode is ON! Start chatting.",
      turnedOff: "✅ chat mode is OFF.",
      simError: "❌ chat is having trouble understanding. Try again later.",
      invalidInput: "❌ Invalid input. Use '-chat on', '-chat off', or ask Simsimi a question.",
    },
  },

  onStart: async function ({ message, args, event, threadsData, getLang }) {
    const { threadID } = event;

    if (args[0] === "on") {
      await threadsData.set(threadID, true, "settings.simsimi");
      return message.reply(getLang("turnedOn"));
    } else if (args[0] === "off") {
      await threadsData.set(threadID, false, "settings.simsimi");
      return message.reply(getLang("turnedOff"));
    }

    if (args.length > 0) { 
      await this.getSimResponse(message, args.join(" "), getLang);
    } else {
      return message.reply(getLang("invalidInput"));
    }
  },

  onChat: async function ({ message, event, isUserCallCommand, threadsData, getLang }) {
    const { threadID, body, attachments } = event;

    if (attachments.length > 0) return; // Ignore messages with attachments

    if (!isUserCallCommand && await threadsData.get(threadID, "settings.simsimi")) {
      this.getSimResponse(message, body, getLang);
    }
  },

  getSimResponse: async function (message, text, getLang) {
    try {
      const response = await axios.get(`https://nova-apis.onrender.com/sim/get?message=${encodeURIComponent(text)}`);
      if (response.data && response.data.response) {
        message.reply(response.data.response);
      } else {
        message.reply(getLang("simError"));
      }
    } catch (error) {
      console.error("Error fetching Simsimi response:", error);
      message.reply(getLang("simError"));
    }
  },
};
