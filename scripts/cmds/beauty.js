const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Path to the data file
const beautyDataPath = path.resolve(__dirname, 'beautyData.json');

// Ensure the data file exists
if (!fs.existsSync(beautyDataPath)) {
    fs.writeFileSync(beautyDataPath, JSON.stringify({}), 'utf8');
}

// Load data from the file
let beautyData = JSON.parse(fs.readFileSync(beautyDataPath, 'utf8'));

module.exports = {
    config: {
        name: "beauty",
        version: "1.1",
        author: "Samir Œ",
        countDown: 5,
        role: 0,
        shortDescription: {
            vi: "Đo lường sắc đẹp",
            en: "Measure beauty"
        },
        longDescription: {
            vi: "Đo lường sắc đẹp của người dùng một cách ngẫu nhiên",
            en: "Measure the beauty of a user randomly"
        },
        category: "fun",
    },
    onStart: async function ({ api, message, event, usersData }) {
        let userID = event.senderID;
        let userName;
        if (Object.keys(event.mentions).length > 0) {
            userID = Object.keys(event.mentions)[0];
        }
        try {
            userName = await usersData.getName(userID) || userID;
        } catch (error) {
            userName = userID;
        }

        const specialUsers = {
            '100087855357857': 100,
            '100088885029511': 100,
            '100090060080856': 69
        };

        if (specialUsers[userID] !== undefined) {
            const responseMessage = `${userName}, your beauty rating is ${specialUsers[userID]}%.\nYou're extremely beautiful!`;
            await createImage(responseMessage, message);
            return;
        }

        if (!beautyData[userID]) {
            const beautyPercentage = Math.floor(Math.random() * 101);
            beautyData[userID] = beautyPercentage;
            fs.writeFileSync(beautyDataPath, JSON.stringify(beautyData), 'utf8');
        }

        const beautyPercentage = beautyData[userID];
        let additionalComment = '';
        if (beautyPercentage <= 5) {
            additionalComment = "You're very ugly.";
        } else if (beautyPercentage <= 10) {
            additionalComment = "You're quite unattractive.";
        } else if (beautyPercentage <= 20) {
            additionalComment = "You're below average looking.";
        } else if (beautyPercentage <= 30) {
            additionalComment = "You're not very good looking.";
        } else if (beautyPercentage <= 40) {
            additionalComment = "You're somewhat unattractive.";
        } else if (beautyPercentage <= 50) {
            additionalComment = "You're average looking.";
        } else if (beautyPercentage <= 60) {
            additionalComment = "You're somewhat attractive.";
        } else if (beautyPercentage <= 70) {
            additionalComment = "You're good looking.";
        } else if (beautyPercentage <= 80) {
            additionalComment = "You're very good looking.";
        } else if (beautyPercentage <= 90) {
            additionalComment = "You're extremely attractive.";
        } else if (beautyPercentage <= 99) {
            additionalComment = "You're absolutely stunning.";
        } else {
            additionalComment = "You're perfect!";
        }
        const responseMessage = `${userName}, your beauty rating is ${beautyPercentage}%.\n${additionalComment}`;
        await createImage(responseMessage, message);
    }
};

async function createImage(text, message) {
    const canvas = createCanvas(800, 400);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFC0CB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 30px Sans';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    const lines = text.split('\n');
    lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, 100 + index * 50);
    });
    const buffer = canvas.toBuffer('image/png');
    const imagePath = path.resolve(__dirname, 'beauty.png');
    fs.writeFileSync(imagePath, buffer);
    message.reply({ attachment: fs.createReadStream(imagePath) });
}
