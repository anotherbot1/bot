const fs = require("fs");
module.exports = {
	config: {
		name: "spam",
		version: "1.0",
		author: "sachiin",
		countDown: 5,
		role: 2,
		shortDescription: "useless",
		longDescription: "",
		category: "𝗢𝗪𝗡𝗘𝗥",
		guide:  {
			vi: "{pn} "
		}
	},  
	onStart: async function ({ api, event, args }) {
		const axios = require("axios");
		const message = args.join(' ');
		if (!message)
			return api.sendMessage(`Type the text that you want to spam.. `, event.threadID, event.messageID);
		var k = function (k) { api.sendMessage(k, event.threadID); };
		for (let i = 0; i < 20; i++) {
			k(`${message}`);
		} 
	}
};