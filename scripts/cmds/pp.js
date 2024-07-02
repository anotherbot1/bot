async function onStart({ event, message, usersData, args, getLang }) {
    try {
        let avt;
        const uid1 = event.senderID;
        const uid2 = Object.keys(event.mentions)[0];
        const uid3 = args[0] && /^\d+$/.test(args[0]) ? args[0] : null;

        if (event.type == "message_reply") {
            avt = await usersData.getAvatarUrl(event.messageReply.senderID);
        } else {
            if (!uid2) {
                if (uid3) {
                    avt = await usersData.getAvatarUrl(uid3);
                } else {
                    const regExCheckURL = /^(http|https):\/\/[^ "]+$/;
                    const link = args[0];
                    if (link && regExCheckURL.test(link)) {
                        const uid4 = await global.utils.findUid(link);
                        if (uid4) {
                            avt = await usersData.getAvatarUrl(uid4);
                        } else {
                            avt = await usersData.getAvatarUrl(uid1);
                        }
                    } else {
                        avt = await usersData.getAvatarUrl(uid1);
                    }
                }
            } else {
                avt = await usersData.getAvatarUrl(uid2);
            }
        }

        const stream = await global.utils.getStreamFromURL(avt);
        if (stream) {
            message.reply({
                body: "",
                attachment: stream
            });
        } else {
            throw new Error("Failed to get stream from URL.");
        }
    } catch (error) {
        console.error("Error in onStart function:", error);
        message.reply("An error occurred while fetching the profile image.");
    }
}

const config = {
    name: "pp",
    aliases: ["profile"],
    version: "1.1",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    shortDescription: "profile image",
    longDescription: "profile image",
    category: "𝗜𝗡𝗙𝗢",
    guide: {
        en: "   {pn} @tag"
    }
};

module.exports = {
    config,
    onStart
};
