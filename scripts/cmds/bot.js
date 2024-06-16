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
        case "bot":
          message.reply({
            body: "∘₊✧─────────────────✧₊∘\n Hey Naughty!!",
          });
          break; // Add this break statement to close the case

        // You can add more cases here if needed

        default:
          // Add default behavior if necessary
          break;
      }
    }
  }
};
