module.exports = {
    config: {
        name: "bot",
        version: "1.0",
        author: "Zeroday",
        countDown: 5,
        role: 0,
        shortDescription: "No Prefix",
        longDescription: "No Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "ganda") return message.reply("I have prefix...!! Use it,otherwise i'll kick you!!");
}
};
