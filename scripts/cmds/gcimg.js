const axios = require("axios");

async function getAvatarUrls(userIDs) {
    let avatarURLs = [];
    try {
        for (let userID of userIDs) {
            const url = `https://graph.facebook.com/${userID}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
            avatarURLs.push(url);
        }
    } catch (error) {
        console.error("Error fetching avatar URLs:", error);
        // Push a default avatar URL or handle the error as needed
        avatarURLs.push("https://i.ibb.co/qk0bnY8/363492156-824459359287620-3125820102191295474-n-png-nc-cat-1-ccb-1-7-nc-sid-5f2048-nc-eui2-Ae-HIhi-I.png");
    }
    return avatarURLs;
}

module.exports = {
    config: {
        // Your config here
    },
    onStart: async function ({ api, args, event, message }) {
        try {
            // Your onStart function here
        } catch (error) {
            console.error("Error in onStart function:", error);
            // Handle the error as needed
            message.reply(`❌ | Error: ${error}`);
        }
    }
};
