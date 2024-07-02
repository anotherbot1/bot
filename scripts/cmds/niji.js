const axios = require("axios");
const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "niji",
    aliases: ["nijijourney"],
    version: "1.0",
    author: "Nova",
    countDown: 60,
    role: 0,
    longDescription: "Text to Image",
    category: "𝗔𝗜",
    guide: {
      en: "{pn} prompt"
    }
  },
  onStart: async function ({ api, args, message, event }) {
    try {
      let prompt = args.join(" ");
      const profanityCheckUrl = `https://profanity-checker.vercel.app/profane?t=${encodeURIComponent(prompt)}`;
      const { data: profanityCheck } = await axios.get(profanityCheckUrl);
      
      if (profanityCheck.isProfane) {
        message.reply("Please don't use bad words. It will generate explicit things!😡");
      } else {
        let imageUrl = `https://ts-ai-api-shuddho.onrender.com/api/animagine?prompt=${encodeURIComponent(prompt)}`;
        const initialMessage = await message.reply("Please wait...⏳");
        message.reaction('⏳', event.messageID);
        
        await message.reply({
          body: `Your Prompt: ${prompt}`,
          attachment: await getStreamFromURL(imageUrl)
        });
        
        message.unsend(initialMessage.messageID);
        await message.reaction('✅', event.messageID);
      }
    } catch (error) {
      console.error(error);
      message.reply("An error occurred.");
      message.reaction('❌', event.messageID);
    }
  }
};
