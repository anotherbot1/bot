const fs = require('fs');

module.exports = {
  config: {
    name: "noprefix",
    version: "1.0",
    author: "ZERODAY",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "𝗢𝗪𝗡𝗘𝗥",
  },

  onStart: async function() {},

  onChat: async function({ event, message, getLang, api }) {
    if (event.body) {
      const word = event.body.toLowerCase();
      switch (word) {
        case "goodnight":
          message.reply({
            body: "∘₊✧─────────────────✧₊∘\n  Goodnight Everyone Sleepwell! 🌃",
          });
          await api.setMessageReaction("😞", event.messageID, event.threadID, api);
          break;

           case "good night":
          message.reply({
            body: "∘₊✧─────────────────✧₊∘\n  Goodnight Everyone Sleepwell! 🌃",
          });
          await api.setMessageReaction("😞", event.messageID, event.threadID, api);
          break;
          
        case "goodmorning":
          message.reply({
            body: "∘₊✧─────────────────✧₊∘ \n Good Morning Everyone! \n Have A Nice Day 🌇",
            attachment: fs.createReadStream("scripts/cmds/noprefix/goodmorning.gif"),
          });
          await api.setMessageReaction("😞", event.messageID, event.threadID, api);
          break;

            case "good morning":
          message.reply({
            body: "∘₊✧─────────────────✧₊∘ \n Good Morning Everyone! \n Have A Nice Day 🌇",
            attachment: fs.createReadStream("scripts/cmds/noprefix/goodmorning.gif"),
          });
          await api.setMessageReaction("😞", event.messageID, event.threadID, api);
          break;
          
        case "welcome":
          message.reply({
            body: "∘₊✧─────────────────✧₊∘\n    Welcome! Enjoy Your Stay! 🌸",
          });
          await api.setMessageReaction("😞", event.messageID, event.threadID, api);
          break;
          
        case "prefix":
          message.reply({
            body: "Hello, My Lord My Prefix Is » / «",
          });
          await api.setMessageReaction("😞", event.messageID, event.threadID, api);
          break;
          
        case "owner":
          message.reply({
            body: "📜 𝙊𝙬𝙣𝙚𝙧 𝙄𝙣𝙛𝙤𝙧𝙢𝙖𝙩𝙞𝙤𝙣:\n𝖭𝖺𝗆𝖾: ZERODAY \n𝖦𝖾𝗇𝖽𝖾𝗋: Male\n𝖠𝗀𝖾: Unknown \n𝖥𝖻: https://facebook.com/zeroday.was.hacker \nStatus: always in offline :(",
          });
          await api.setMessageReaction("😞", event.messageID, event.threadID, api);
          break;
          
        default:
          return;
      }
    }
  }
};
