module.exports = {
  config: {
    name: "bot",
    version: "1.0",
    author: "ZERODAY",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "𝗙𝗨𝗡",
  },
  onStart: async function({ message, usersData, event }) {
    try {
      let name = await usersData.getName(event.senderID);
      let id = event.senderID;
      message.reply({
        body: ` ∘₊✧─────────────────✧₊∘ ${name} Hey naughty!`,
        mentions: [
          { tag: name, id: id },
        ]
      });
    } catch (error) {
      console.error('Error in onStart function:', error);
      message.reply('An error occurred while processing your request.');
    }
  },
  onChat: async function({ event, message, usersData }) {
    try {
      if (event.body && (event.body.toLowerCase() == "bot" || event.body.toLowerCase() == "Zeroday")) {
        let name = await usersData.getName(event.senderID);
        let id = event.senderID;
        message.reply({
          body: `∘₊✧─────────────────✧₊∘ ${name} Hey naughty!`,
          mentions: [
            { tag: name, id: id },
          ]
        });
      }
    } catch (error) {
      console.error('Error in onChat function:', error);
      message.reply('An error occurred while processing your request.');
    }
  }
};
