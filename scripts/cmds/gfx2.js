const axios = require('axios');
const fs = require('fs');
const path = require('path') 

module.exports = {
  config: {
    name: "gfx2",
    version: "1.0",
    author: "author",
    countDown: 20,
    role: 0,
    longDescription: {
      en: "text to create your gfx logo"
    },
    category: "𝗖𝗢𝗩𝗘𝗥",
    guide: {
      en: "\n   {pn} <your text>"
        + "\n   Example:"
        + "\n   {pn} <your text>"
  }
},

	onStart: async function ({ api, event, args, Users }) {
		const request = require('request');
		const fs = require("fs-extra");
		const axios = require("axios");
		const pathImg = __dirname + `/cache/${event.threadID}_${event.senderID}.png`;
		const text = args.join(" ");
		if (!text) return api.sendMessage(`Wrong format type /help to see usage`, event.threadID, event.messageID);
		const getWanted = await axios.get(`https://tanjiro-api.onrender.com/gfx2?name=${text}&api_key=tanjiro`, { responseType: "arraybuffer" }).then(res => res.data).catch(() => null);
		if (!getWanted) return api.sendMessage(`An error occurred, please try again later!`, event.threadID, event.messageID);
		fs.writeFileSync(pathImg, Buffer.from(getWanted, "utf-8"));
		return api.sendMessage({ attachment: fs.createReadStream(pathImg) }, event.threadID, () => fs.unlinkSync(pathImg), event.messageID);
	}
};