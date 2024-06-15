module.exports = {
  config: {
    name: "tag",
    aliases: ["tag"],
    version: "1.0",
    author: "Samir Œ",
    role: 0,
    shortDescription: {
      en: "Mention a user",
    },
    longDescription: {
      en: "Mention a user using their UID or link",
    },
    category: "𝗙𝗨𝗡",
    guide: {
      en: "{p}mention <uid/link> [text]",
    },
  },
  onStart: async function ({ event, message, args, usersData }) {
    const { senderID, messageReply } = event;
    let id;
    let text;

    const findUidFromLink = async (link) => {
      const { findUid } = global.utils;
      return await findUid(link);
    };

    if (args.length > 0) {
      const firstArg = args[0];

      if (/^(http|https):\/\/[^ "]+$/.test(firstArg)) {
        id = await findUidFromLink(firstArg);
        text = args.slice(1).join(" ");
      } else if (/^\d+$/.test(firstArg)) {
        id = parseInt(firstArg, 10);
        text = args.slice(1).join(" ");
      } else {
        message.reply("Invalid argument. Please provide a valid UID or link.");
        return;
      }
    } else if (messageReply && messageReply.senderID) {
      id = parseInt(messageReply.senderID, 10);
      text = args.join(" ");
    } else {
      id = parseInt(senderID, 10);
      text = args.join(" ");
    }

    try {
      const userData = await usersData.get(id);
      if (!userData) {
        message.reply("User not found.");
        return;
      }
      const name = userData.name;
      const mention = [{ id, tag: name }];

      await message.reply({
        body: `${name} ${text}`,
        mentions: mention,
      });
    } catch (error) {
      console.error("Error while mentioning the user:", error);
      message.reply("Error while mentioning the user. Please try again later.");
    }
  },
};
