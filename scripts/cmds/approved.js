const fs = require("fs");

module.exports = {
  config: {
    name: "approved",
    author: "ZERODAY",
    countDown: 0,
    role: 0,
    category: "𝗢𝗪𝗡𝗘𝗥",
    shortDescription: {
      en: ""
    }
  },

  onLoad: async function() {
    const dataPath = __dirname + "/cache/approvedThreads.json";
    const pendingPath = __dirname + "/cache/pendingThreads.json";

    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, JSON.stringify([]));
    }

    if (!fs.existsSync(pendingPath)) {
      fs.writeFileSync(pendingPath, JSON.stringify([]));
    }
  },

  onStart: async function({ event, api, args }) {
    const { threadID, messageID, senderID } = event;
    const dataPath = __dirname + "/cache/approvedThreads.json";
    const pendingPath = __dirname + "/cache/pendingThreads.json";
    let data = JSON.parse(fs.readFileSync(dataPath));
    let pending = JSON.parse(fs.readFileSync(pendingPath));
    let msg = "";
    let idBox = args[0] || threadID;

    if (args[0] == "list") {
      msg = "𝐋𝐈𝐒𝐓 𝐎𝐅 𝐀𝐏𝐏𝐑𝐎𝐕𝐄𝐃 𝐁𝐎𝐗𝐄𝐒!";
      let count = 0;

      for (const e of data) {
        msg += `${count += 1}. ID: ${e}`;
      }

      api.sendMessage(msg, threadID, messageID);
    } else if (args[0] == "del") {
      idBox = args[1] || event.threadID;

      if (isNaN(parseInt(idBox))) {
        api.sendMessage("Not a number.", threadID, messageID);
        return;
      }

      if (!data.includes(idBox)) {
        api.sendMessage("𝐓𝐡𝐞 𝐛𝐨𝐱 𝐰𝐚𝐬 𝐧𝐨𝐭 𝐚𝐩𝐩𝐫𝐨𝐯𝐞𝐝 𝐛𝐞𝐟𝐨𝐫𝐞! ", threadID, messageID);
        return;
      }

      api.sendMessage(`𝐁𝐨𝐱 ${idBox} 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐫𝐞𝐦𝐨𝐯𝐞𝐝 𝐟𝐫𝐨𝐦 𝐛𝐨𝐭 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐥𝐢𝐬𝐭`, threadID, () => {
        if (!pending.includes(idBox)) {
          pending.push(idBox);
        }

        data.splice(data.indexOf(idBox), 1);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2));
      }, messageID);
    } else if (args[0] == "pending") {
      msg = "𝐋𝐈𝐒𝐓 𝐎𝐅 𝐁𝐎𝐗𝐄𝐒 𝐖𝐀𝐈𝐓𝐈𝐍𝐆 𝐓𝐎 𝐁𝐄 𝐀𝐏𝐏𝐑𝐎𝐕𝐄𝐃!";
      let count = 0;

      for (const e of pending) {
        const name = (await api.getThreadInfo(e)).name || "𝐂𝐡𝐚𝐭 𝐆𝐫𝐨𝐮𝐩";
        msg += `${count += 1}. ${name}\ID: ${e}`;
      }

      api.sendMessage(msg, threadID, messageID);
    } else if (isNaN(parseInt(idBox))) {
      api.sendMessage("Invalid ID entered ", threadID, messageID);
    } else if (data.includes(idBox)) {
      api.sendMessage(`ID ${idBox} was approved before! `, threadID, messageID);
    } else {
      api.sendMessage("» Hey ZERODAY BOT here ,  Box has been approved by admin. Use /help to see more commands.", threadID, (error, info) => {
        if (error) {
          api.sendMessage("An error occurred, make sure that the ID you entered is valid and the bot is in the box! ", threadID, messageID);
        } else {
          data.push(idBox);
          pending.splice(pending.indexOf(idBox), 1);
          fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
          fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2));
          api.sendMessage(`» 𝐁𝐨𝐱 𝐚𝐩𝐩𝐫𝐨𝐯𝐚𝐥 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥: ${idBox}`, threadID, messageID);
        }
      });
    }
  }
};
