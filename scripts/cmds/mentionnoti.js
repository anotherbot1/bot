const moment = require("moment-timezone");

const destination = "100081646431766"; // ADD YOUR UID HERE

module.exports = {
  config: {
    name: "mentionnoti",
    aliases: [],
    version: "1.0",
    author: "kshitiz", // CODE AUTHOR
    shortDescription: "bot will notify you if your name was mentioned in chatbox",
    longDescription: "bot will notify you if your name was mentioned in chatbox",
    category: "𝗢𝗪𝗡𝗘𝗥",
    guide: "{pn} notify",
  },

  onStart: async function ({ api, args, message, event, usersData }) {
    message.reply("This command is configured to notify when the name of the bot admin is mentioned.");
  },
  onChat: async function ({ api, args, message, usersData, threadsData, event }) {
    const data = await usersData.get(event.senderID);
    const name = data.name;
    const thread = await threadsData.get(event.threadID);
    const threadName = thread.threadName;

    const chat = event.body;
    if (chat.includes(`Muhid`)) { // SET YOUR NAME HERE 
      const formattedDate = moment.tz("Asia/Dhaka").format("dddd, DD MMMM YYYY, HH:mm:ss");//ADD YOUR COUNTRY TIME ZONE

      api.sendMessage(`⚠𝘆𝗼𝘂𝗿 𝗻𝗮𝗺𝗲 𝘄𝗮𝘀 𝗺𝗲𝗻𝘁𝗶𝗼𝗻𝗲𝗱:\n\n
❒3𝗦𝗘𝗡𝗗𝗘𝗥 𝗡𝗔𝗠𝗘: ${name}\n
❒𝗦𝗘𝗡𝗗𝗘𝗥 𝗨𝗜𝗗: ${event.senderID}\n
❒𝗚𝗖 𝗡𝗔𝗠𝗘: ${threadName}\n
❒𝗧𝗛𝗥𝗘𝗔𝗗 𝗜𝗗: ${event.threadID}\n
❒𝗠𝗘𝗡𝗧𝗜𝗢𝗡 𝗠𝗦𝗚:
${event.body}\n
❒𝗗𝗔𝗧𝗘&𝗧𝗜𝗠𝗘: ${formattedDate}\n`, destination);
    }
  }
};
