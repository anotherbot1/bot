const axios = require("axios");

module.exports = {
  config: {
    name: "teach",
    aliases: ["simteach"],
    version: "1.0",
    author: "Loid Butter", // Big Credits Kay Lods KENLIEPLAYS
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "teach sim"
    },
    longDescription: {
      en: "teach sim"
    },
    category: "𝗙𝗨𝗡",
    guide: {
      en: "{p}teach your ask | my answer "
    }
  },
  onStart: async function ({ api, event, args }) {
    const { messageID, threadID } = event;
    const tid = threadID;
    const mid = messageID;

    if (!args[0]) {
      return api.sendMessage("Use -teach your ask | sim respond", tid, mid);
    }

    const content = args.join(" ").split("|").map(item => item.trim());
    
    if (content.length < 2) {
      return api.sendMessage("Please provide both a question and an answer separated by '|'.", tid, mid);
    }

    const ask = encodeURIComponent(content[0]);
    const ans = encodeURIComponent(content[1]);

    try {
      const res = await axios.get(`https://nova-apis.onrender.com/sim/teach?message=${ask}&respond=${ans}`);
      const responseMessage = res.data.message;
      api.sendMessage(responseMessage, tid, mid);
    } catch (error) {
      console.error("Error during axios request:", error);
      api.sendMessage("An error occurred while processing your request.", tid, mid);
    }
  }
};
