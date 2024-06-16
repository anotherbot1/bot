module.exports = {
  config: {
    name: "noprefix",
    version: "1.0",
    author: "ZERODAY",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },

  onStart: async function() {},

  onChat: async function({ event, message, getLang, api }) {
    if (event.body) {
      const word = event.body.toLowerCase();
      switch (word) {
        case "bot":
          if (event.mentions && Object.keys(event.mentions).length > 0) {
            let mention = Object.keys(event.mentions)[0];
            let name = event.mentions[mention];
            let arrayTag = [{ id: mention, tag: name }];
            message.reply({
              body: `∘₊✧─────────────────✧₊∘\ntag : ${name} Hey naughty!`,
              mentions: arrayTag
            });
          } else {
            message.reply({
              body: "No mention found."
            });
          }
          break;

        // You can add more cases here if needed

        default:
          // Add default behavior if necessary
          break;
      }
    }
  }
};
