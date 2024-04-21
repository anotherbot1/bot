const axios = require("axios");
module.exports = {
  config: {
    name: "hq",
    version: "1.0",
    author: "ITACHI",
    countDown: 30,
    role: 0,
    description: {
      vi: "idk vietnamese",
      en: "generate image with xl31 model"
    },
    category: "𝗔𝗜",
    guide: {
      vi:"",
      en: "{pn} prompt"
    }
  },

    onStart: async function ({ event, message, usersData, args, getLang }) {
      let prompt = args.join("");
      let res;
      try {
      const getImage = await global.utils.getStreamFromURL(https://mystic-10n1.onrender.com/xl31?prompt=${prompt});
      message.reply({
        attachment: getImage
      });
      }
      catch (error) {
      message.reply("hqhq")

    }
  }
};
