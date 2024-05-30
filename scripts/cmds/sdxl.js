const axios = require('axios');

module.exports = {
  config: {
    name: "sdxl",
    version: "1.0",
    author: "Muhid", 
    shortDescription: {
      en: "Generate images using SDXL models"
    },
    longDescription: {
      en: "Generates images based on a prompt and selected SDXL model."
    },
    category: "𝗔𝗜",
    guide: {
      en: "{pn} <prompt> | <model number>\nModel numbers:\n1: sd-1.5-realistic\n2: sdxl-1.0-lcm-base\n3: sd-1.5-dreamshaper-8"
    }
  },

  onStart: async function ({ message, args }) {
    try {
      const [prompt, modelNumber] = args.join(" ").split("|").map(item => item.trim()); 
      if (!prompt || !modelNumber) return message.reply("Please provide a prompt and model number.");

      const models = {
        '1': 'sd-1.5-realistic', 
        '2': 'sdxl-1.0-lcm-base', 
        '3': 'sd-1.5-dreamshaper-8' 
      };

      const selectedModel = models[modelNumber];
      if (!selectedModel) return message.reply("Invalid model number. Please choose 1, 2, or 3.");

      const apiUrl = `https://nova-apis.onrender.com/gen/gen?prompt=${encodeURIComponent(prompt)}&model=${selectedModel}`;
      const response = await axios.get(apiUrl); 
      const imageUrl = response.data.images;

      if (!imageUrl) {
        return message.reply("No image found for the given prompt and model.");
      }

      message.reply("Generating image... Please wait. ⏳");

      // Fetch the image
      const imageStream = await global.utils.getStreamFromURL(imageUrl);
      if (imageStream) {
        return message.reply({ attachment: imageStream }); 
      } else {
        // If fetching fails, send the image URL directly
        return message.reply(`Image URL: ${imageUrl}`);
      }
    } catch (error) {
      console.error(error); 
      message.reply("An error occurred while processing your request.");
    }
  }
};
