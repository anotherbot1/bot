const axios = require('axios');
const fs = require('fs-extra');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  config: {
    name: "hack",
    version: "1.0",
    author: "ZERODAY",
    role: 0,
    shortDescription: "Bot will hack your account",
    longDescription: "If you use this command, the bot will hack your account seriously.",
    category: "UTILITY",
    guide: {
      en: "{p} mention",
    },
  },

  onStart: async function ({ message, event, args, api }) {
    const mention = Object.keys(event.mentions);
    const messages = [
      `${args.join(" ")} The account got hacked.`,
      `${args.join(" ")} The account got hacked..`,
      `${args.join(" ")} The account got hacked...`,
      `${args.join(" ")} The account got hacked.`,
      `${args.join(" ")} The account got hacked..`,
      `${args.join(" ")} The account got hacked...`,
      `${args.join(" ")} Account hacking Complete`
    ];
    // Handle sending these messages in the desired manner
  },

  wrapText: async function (ctx, text, maxWidth) {
    return new Promise((resolve) => {
      if (ctx.measureText(text).width < maxWidth) return resolve([text]);
      if (ctx.measureText("W").width > maxWidth) return resolve(null);
      const words = text.split(" ");
      const lines = [];
      let line = "";

      while (words.length > 0) {
        let split = false;
        while (ctx.measureText(words[0]).width >= maxWidth) {
          const temp = words[0];
          words[0] = temp.slice(0, -1);
          if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
          else {
            split = true;
            words.splice(1, 0, temp.slice(-1));
          }
        }
        if (ctx.measureText(`${line}${words[0]}`).width < maxWidth)
          line += `${words.shift()} `;
        else {
          lines.push(line.trim());
          line = "";
        }
        if (words.length === 0) lines.push(line.trim());
      }
      resolve(lines);
    });
  },

  onStartImage: async function ({ api, event }) {
    let pathImg = __dirname + "/cache/background.png";
    let pathAvt1 = __dirname + "/cache/Avtmot.png";
    var id = Object.keys(event.mentions)[0] || event.senderID;
    var name = await api.getUserInfo(id);
    name = name[id].name;
    var background = ["https://i.imgur.com/VQXViKI.png"];
    var rd = background[Math.floor(Math.random() * background.length)];

    let getAvtmot = (
      await axios.get(
        `https://graph.facebook.com/${id}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
        { responseType: "arraybuffer" }
      )
    ).data;
    fs.writeFileSync(pathAvt1, Buffer.from(getAvtmot, "utf-8"));
    let getbackground = (
      await axios.get(rd, {
        responseType: "arraybuffer",
      })
    ).data;
    fs.writeFileSync(pathImg, Buffer.from(getbackground, "utf-8"));

    let baseImage = await loadImage(pathImg);
    let baseAvt1 = await loadImage(pathAvt1);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");

    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.font = "400 23px Arial";
    ctx.fillStyle = "#1878F3";
    ctx.textAlign = "start";
    const lines = await this.wrapText(ctx, name, 1160);
    ctx.fillText(lines.join("\n"), 200, 497); // Adjusted coordinates and font size
    ctx.beginPath();
    ctx.drawImage(baseAvt1, 83, 437, 100, 101);

    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    fs.removeSync(pathAvt1);

    return api.sendMessage(
      {
        body: " ",
        attachment: fs.createReadStream(pathImg),
      },
      event.threadID,
      () => fs.unlinkSync(pathImg),
      event.messageID
    );
  },
};
