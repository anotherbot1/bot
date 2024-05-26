const axios = require('axios');

module.exports = {
    config: {
        name: "art",
        version: "1.0",
        author: "Nova Calyx",
        countDown: 5,
        role: 0,
        shortDescription: "Art style image",
        longDescription: "Apply an artistic style to an image.",
        category: "𝗔𝗜",
        guide: {
            en: "{pn} (reply to an image)"
        }
    },

    langs: {
        en: {
            replyToImage: "Please reply to an image.",
            error: "An error occurred while processing the image."
        }
    },

    onStart: async function ({ api, message, event }) {
        const { threadID, messageReply } = event;

        if (!messageReply || !messageReply.attachments || messageReply.attachments.length === 0 || !messageReply.attachments[0].url) {
            return message.reply(this.langs.en.replyToImage);
        }

        const imageUrl = messageReply.attachments[0].url;

        let loadingMessage;
        try {
            loadingMessage = await message.reply("Processing your image...");

            const apiResponse = await axios.get(`https://nova-apis.onrender.com/art/art?imageUrl=${encodeURIComponent(imageUrl)}`);
            
            if (apiResponse.data && apiResponse.data.hqhq) {
                const resultImageUrl = apiResponse.data.hqhq;

                const imageStream = await global.utils.getStreamFromURL(resultImageUrl);

                await message.reply({
                    attachment: imageStream
                });

                await message.unsend(loadingMessage.messageID);
            } else {
                throw new Error("Invalid response from API");
            }
        } catch (error) {
            console.error("Error in art command:", error);
            if (loadingMessage) {
                await message.unsend(loadingMessage.messageID);
            }
            message.reply(this.langs.en.error);
        }
    }
};
