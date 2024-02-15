const fs = require("fs");
const jimp = require("jimp");
const axios = require("axios");
const request = require("request");
const moment = require("moment-timezone");
module.exports = {
  config: {
     name: "info",
    version: "1.0",
    author: "Itachi",
    countDown: 5,
    role: 0,
    shortDescription: "Admin and Bot information",
    longDescription: "Admin and Bot information",
    category: "Information",
    guide: {
      en: "{p}{n}",
    },
  },
 
onStart : async function({ api,event,threadID })  {
const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);

var juswa = moment.tz("Asia/Dhaka").format("ã€ŽD/MM/YYYYã€ ã€hh:mm:ssã€‘");
var link =["https://i.ibb.co/f8sXJ2S/Default-The-mysterious-appearance-of-a-creature-hidden-in-the-5-5af4211a-f0cc-4882-b674-8771b0045a7b.jpg"];
  
var callback = () => api.sendMessage({body:`ADMIN AND BOT INFORMATION 

BOT NAME : ELITE BOT
FACEBOOK : facebook.com/Lamed.69
BOT PREFIX : ${global.GoatBot.config.prefix}
BOT OWNER : ITACHI UCHIHA
TIME : ${juswa} 
BOT IS RUNNING ${hours}:${minutes}:${seconds}.

THANKS FOR USING ELITE BOT`,
                                      attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.jpg")).on("close",() => callback());
   }
  };