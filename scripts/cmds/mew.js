const axios = require('axios');

module.exports = {
  config: {
    name: "mew",
    version: "1.0", 
    author: "Muhid",
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

      const apiUrl = https://prodia.vercel.app/prodia?prompt=${encodeURIComponent(prompt)}&model=dreamshaper_7.safetensors+%5B5cf5ae06%5D; 
      const response = await axios.get(apiUrl);
      const imageData = response.data;
      const imageUrl = imageData.hqhq; 

      if (!imageUrl) {
        return message.reply("No image found for the given prompt.");
      }

      message.reply("Generating image.."); 

     
      await new Promise(resolve => setTimeout(resolve, 8000));

      
      const imageStream = await global.utils.getStreamFromURL(imageUrl); 
      if (imageStream) {
        return message.reply({ attachment: imageStream });
      } else {
       
        return message.reply(hqhq);
      }
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while processing your request.");
    }
  }
};
