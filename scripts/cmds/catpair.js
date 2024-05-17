const { loadImage, createCanvas } = require("canvas");
const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "catpair",
    aliases: ["catpair"],
    version: "1.0",
    author: "ZERODAY",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "𝗙𝗨𝗡",
  },
  onStart: async function ({ api, event, args, usersData, threadsData }) {
    try {
      const cacheDir = __dirname + "/cache";
      await fs.ensureDir(cacheDir);

      let pathImg = cacheDir + "/background.png";
      let pathAvt1 = cacheDir + "/Avtmot.png";
      let pathAvt2 = cacheDir + "/Avthai.png";

      var id1 = event.senderID;
      var name1 = await usersData.getName(id1); // Replace with function that retrieves the name of the user
      var ThreadInfo = await api.getThreadInfo(event.threadID);
      var all = ThreadInfo.userInfo;
      var gender1;

      for (let c of all) {
        if (c.id == id1) gender1 = c.gender;
      }

      const botID = api.getCurrentUserID();
      let candidates = [];

      if (gender1 === "FEMALE") {
        for (let u of all) {
          if (u.gender === "MALE" && u.id !== id1 && u.id !== botID) candidates.push(u.id);
        }
      } else if (gender1 === "MALE") {
        for (let u of all) {
          if (u.gender === "FEMALE" && u.id !== id1 && u.id !== botID) candidates.push(u.id);
        }
      } else {
        for (let u of all) {
          if (u.id !== id1 && u.id !== botID) candidates.push(u.id);
        }
      }

      var backgrounds = [
        "https://i.postimg.cc/wjJ29HRB/background1.png",
        "https://i.postimg.cc/zf4Pnshv/background2.png",
        "https://i.postimg.cc/5tXRQ46D/background3.png",
      ];
      var selectedBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];

      let avatar1 = await axios.get(
        `https://graph.facebook.com/${id1}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
        { responseType: "arraybuffer" }
      );
      fs.writeFileSync(pathAvt1, Buffer.from(avatar1.data, "utf-8"));

      const avatarURLs = [
        "https://imgur.com/a/dO7Moiv",
        "https://imgur.com/wOUm60L",
        "https://imgur.com/RZgRZz6",
        "https://imgur.com/jupXJJj",
        "https://imgur.com/SHygDQu",
        "https://imgur.com/CQv2wVm",
        "https://imgur.com/TrPpyGB",
        "https://imgur.com/eFpF1Ow",
        "https://imgur.com/GyoIVT7"
      ];
      let randomAvatarURL = avatarURLs[Math.floor(Math.random() * avatarURLs.length)];

      let avatar2 = await axios.get(randomAvatarURL, { responseType: "arraybuffer" });
      fs.writeFileSync(pathAvt2, Buffer.from(avatar2.data, "utf-8"));

      let background = await axios.get(selectedBackground, { responseType: "arraybuffer" });
      fs.writeFileSync(pathImg, Buffer.from(background.data, "utf-8"));

      let baseImage = await loadImage(pathImg);
      let baseAvt1 = await loadImage(pathAvt1);
      let baseAvt2 = await loadImage(pathAvt2);
      let canvas = createCanvas(baseImage.width, baseImage.height);
      let ctx = canvas.getContext("2d");

      ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(baseAvt1, 100, 150, 300, 300);
      // Draw second avatar (position needs to be adjusted based on requirements)
      ctx.drawImage(baseAvt2, 450, 150, 300, 300);

      const imageBuffer = canvas.toBuffer();
      fs.writeFileSync(pathImg, imageBuffer);
      fs.removeSync(pathAvt1);
      fs.removeSync(pathAvt2);

      return api.sendMessage(
        {
          body: `Congratulations ${name1}, you've been successfully paired!`,
          mentions: [{ tag: `${name1}`, id: id1 }],
          attachment: fs.createReadStream(pathImg),
        },
        event.threadID,
        () => fs.unlinkSync(pathImg),
        event.messageID
      );
    } catch (error) {
      console.error("Error occurred:", error);
      return api.sendMessage("An error occurred while processing your request.", event.threadID, event.messageID);
    }
  },
};
