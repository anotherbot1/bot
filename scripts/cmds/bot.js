module.exports = {
  config: {
      name: "bot",
      version: "1.0",
      author: "XEMON",
      countDown: 5,
      role: 0,
      shortDescription: "ignore this command",
      longDescription: "ignore this command",
      category: "no prefix",
  },
onStart: async function(){}, 
onChat: async function({
  event,
  message,
  getLang
}) {
  if (event.body && event.body.toLowerCase() ==["bot","anya","robot"]) return message.reply("ANYA is active darling");
}
};