const axios = require("axios");
module.exports = {
	config: {
		name: "waifu",
		version: "1.1",
		author: "farid",
		countDown: 20,
		role: 2,
		shortDescription: {
			vi: "",
			en: ""
		},
		longDescription: {
			vi: "",
			en: "\n Enter a prompt then it give an Image. \n Prompts: waifu, neko, megumin, bully cuddle, cry, hug,awoo,kiss, lick, pat, smug, bonk, yeet, blush, smile, wave, highfive, handhold, nom, bite, glomp, slap, kill, kick, happy, wink, poke, dance, cringe  "
		},
		category: "𝗠𝗘𝗗𝗜𝗔",
		guide: {
			vi:"",
			en: ""
		}
	},

	langs: {
		vi: {
			invalidUrl: "",
			error: ""
		},
		en: {
			invalidUrl: "",
			error: ""
		}
	},

    onStart: async function ({ event, message, usersData, args, getLang }) {
      let name = args.join("");
      let res;
    	try {
				res = await axios.get(`https://api.waifu.pics/sfw/${name}`, {
				params: {
          name
				}
			});
			const getImage = await global.utils.getStreamFromURL(res.data.url);
			message.reply({
				attachment: getImage
			});
      }
      catch (error) {
			const err = error.response.data.message;
			
		}
	}
};
