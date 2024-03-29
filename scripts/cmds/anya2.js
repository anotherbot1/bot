const axios = require("axios");

module.exports = {
	config: {
		name: "chat",
		version: "1.2",
		author: "Your Name",
		countDown: 5,
		role: 0,
		shortDescription: "simsimi",
		longDescription: {
			vi: "Chat với simsimi",
			en: "Chat with simsimi",
		},
		category: "funny",
		guide: {
			vi: "{pn} [on | off]: bật/tắt simsimi\rd>: chat nhanh với simsimi\i",
			en: "{pn} <word>: chat with Sammy with a simple: hi",
		},
	},

	langs: {
		vi: {
			turnedOn: "Bật simsimi thành công!",
			turnedOff: "Tắt simsimi thành công!",
			chatting: "Đang chat với simsimi",
			error: "simsimi đang bận, bạn hãy thử lại sau",
		},
		en: {
			turnedOn: "Turned on Chat successfully!",
			turnedOff: "Turned off Chat successfully!",
			chatting: "Already Chatting with Anya... :)",
			error: "What?🙂",
		},
	},

	onStart: async function ({ args, threadsData, message, event, getLang }) {
		if (args[0] == "on" || args[0] == "off") {
			await threadsData.set(event.threadID, args[0] == "on", "settings.simsimi");
			return message.reply(args[0] == "on" ? getLang("turnedOn") : getLang("turnedOff"));
		} else if (args[0]) {
			const yourMessage = args.join(" ");
			try {
				const responseMessage = await getMessage(yourMessage);
				return message.reply(`${responseMessage}`);
			} catch (err) {
				console.log(err);
				return message.reply(getLang(""));
			}
		}
	},

	onChat: async function ({ args, message, threadsData, event, isUserCallCommand, getLang }) {
		if (
			args.length > 1 &&
			!isUserCallCommand &&
			(await threadsData.get(event.threadID, "settings.simsimi"))
		) {
			try {
				const langCode = (await threadsData.get(event.threadID, "settings.lang")) || global.GoatBot.config.language;
				const responseMessage = await getMessage(args.join(" "), langCode);
				return message.reply(`${responseMessage}`);
			} catch (err) {
				return message.reply(getLang(""));
			}
		}
	},
};

async function getMessage(yourMessage, langCode) {
	const res = await axios.post(
		"https://simsimi.fun/api/v2/?mode=talk&lang=bn&message=" + encodeURIComponent(yourMessage) + "&filter=true"
	);

	if (res.status >= 200 && res.status < 300) {
		return res.data.success;
	} else {
		throw new Error(res.data.success);
	}
}