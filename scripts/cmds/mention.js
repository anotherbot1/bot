module.exports.config = {
		name: "mention",
		version: "1.0.0",
		author: "ZERODAY",
		hasPermssion: 2,
		description:"Mention him if he doesn't listen" ,
		commandCategory: "𝗙𝗨𝗡",
		usages: "{pn} mention",
		cooldowns: 10,
		dependencies: {
				"fs-extra": "",
				"axios": ""
		}
}

module.exports.onStart = async function({ api, args, Users, event}) {
		var mention = Object.keys(event.mentions)[0];
		if(!mention) return api.sendMessage("Need to tag 1 user whom you want to start mention", event.threadID);
 let name =  event.mentions[mention];
		var arraytag = [];
				arraytag.push({id: mention, tag: name});
		var a = function (a) { api.sendMessage(a, event.threadID); }
a("hi");
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 3000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 5000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 7000);
setTimeout(() => {a({body: " hi" + " " + name, mentions: arraytag})}, 9000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 11000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 13000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 15000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 17000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 19000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 20000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 21500);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 24000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 26000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 28000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 30000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 32000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 35000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 37000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 40000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 42000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 46000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 48000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 51000);
setTimeout(() => {a({body: " hi" + " " + name, mentions: arraytag})}, 54000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 57000);
setTimeout(() => {a("hi")} , 59000);
}
