const axios = require('axios');

module.exports = {
    config: {
        name: "forecast",
        aliases: ['forecast'],
        version: "1.0",
        author: "zeroday",
        countDown: 5,
        role: 0,
        shortDescription: {
            en: "you can see forecast"
        },
        longDescription: {
            en: "you can see Bangladeshi weather from BAF"
        },
        category: "𝗨𝗧𝗜𝗟𝗜𝗧𝗬",
        guide: {
            en: "{pn}"
        }
    },
    onStart: async function ({ event, usersData, commandName, threadID }) {
        try {
            const url = "https://wx.baf.mil.bd/METBSR/images/omar/RadarSingle/mtr.jpg";
            const namePlayerReact = await usersData.getName(event.senderID);
            const msg = {
                body: Today's Forecast Of Bangladesh,
                attachment: await global.utils.getStreamFromURL(url) 
            };
            api.sendMessage(msg, threadID, async (error, info) => {
                if (error) {
                    console.error("Error sending message:", error);
                    return;
                }
            });
        } catch (error) {
            console.error("Error fetching or sending data:", error);
        }
    }
};
