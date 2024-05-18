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
			
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 3000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 4500);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 6000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 7500);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 9000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 10500);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 12000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 13500);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 15000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 16500);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 18000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 19500);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 21000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 22500);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 24000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 25500);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 27000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 28500);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 30000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 31500);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 33000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 34500);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 36000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 37500);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 39000);
setTimeout(() => {a({body: "hi" + " " + name, mentions: arraytag})}, 40500);



	}
