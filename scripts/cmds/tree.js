const axios = require('axios');

module.exports = {
  config: {
    name: "tree",
    version: "1.0", 
    author: "Muhid-ZERODAY",
    countDown: 5,
    shortDescription: {
      en: "Generate an image based on a prompt"
    },
    longDescription: {
      en: "Uses the prodia API to generate an image based on the provided prompt"
    },
    category: "𝗔𝗜",
    guide: {
      en: "{pn} <prompt>" 
    }
  },

  onStart: async function ({ message, args }) {
    try {
      const prompt = args.join(" ");
      if (!prompt) return message.reply("Please provide a prompt.");

      const apiUrl = `https://aiimage.hellonepdevs.workers.dev/?prompt=${encodeURIComponent(prompt)}`; 
      
      message.reply("Generating image.."); 

      await new Promise(resolve => setTimeout(resolve, 4000));

      const imageStream = await global.utils.getStreamFromURL(apiUrl); 
      if (imageStream) {
        return message.reply({ attachment: imageStream });
      } else {
        return message.reply("No image found for the given prompt.");
      }
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while processing your request.");
    }
  }
};
