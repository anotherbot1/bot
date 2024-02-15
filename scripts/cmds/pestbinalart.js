const destination = "100081646431766"; // your uid

module.exports = {
  config: {
    name: "catchpastebin",
    version: 1.0,
    author: "LiANE",
    countDown: 5,
    role: 2,
    shortDescription: { en: "Catch Pastebin" },
    longDescription: { en: "Use this to catch pastebin" },
    category: "𝗨𝗦𝗘𝗟𝗘𝗦𝗦",
    guide: { en: "{pn}" }
  },
  onStart: async function ({ api, args, message, event, usersData }) {
    const data = await usersData.get(event.senderID);
    const name = data.name;
    message.reply(`⚠ 𝗣𝗮𝘀𝘁𝗲𝗯𝗶𝗻 𝗔𝗹𝗲𝗿𝘁:
How to use? Open the code file, and change the id destination to your userID, once the changes have been made, I can assure that this command will work correctly.`);
  },
  onChat: async function ({ api, args, message, usersData, threadsData, event }) {
    const data = await usersData.get(event.senderID);
    const name = data.name;
    const thread = await threadsData.get(event.threadID);
    const threadName = thread.threadName;

    const chat = event.body;
    if (chat.includes(`pastebin.com`)) {
      api.sendMessage(`⚠ 𝗣𝗮𝘀𝘁𝗲𝗯𝗶𝗻 𝗔𝗹𝗲𝗿𝘁:
» From: ${name}
» UID: ${event.senderID}
» Thread: ${threadName}
» GCID: ${event.threadID}
🔖 Content:
${event.body}`, destination);
    }
  }
};