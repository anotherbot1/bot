const os = require("os");
const moment = require("moment-timezone");
const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "stats",
    aliases: ["ping", "upt", "time"],
    version: "2.2",
    author: "Muhid",
    role: 0,
    shortDescription: {
      en: "Get bot stats",
    },
    longDescription: {
      en: "Displays stylish stats of the bot, including uptime, memory usage, ping, and more.",
    },
    category: "𝗜𝗡𝗙𝗢",
    guide: {
      en: "{pn} [options]\nOptions:\n  - all: Show all available stats\n  - uptime: Show uptime only\n  - memory: Show memory usage only\n  - ping: Show ping only",
    },
  },

  onStart: async function ({ api, event, args, usersData, threadsData }) {
    try {
      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const uptime = process.uptime();

      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      const uptimeString = ${hours}Hrs ${minutes}min ${seconds}sec;

      const currentDate = new Date();
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      const date = currentDate.toLocaleDateString("en-US", options);
      const time = currentDate.toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour12: true,
      });

      const timeStart = Date.now();
      await api.sendMessage({
        body: "Calculating stats Sir Wait... 🤖",
      }, event.threadID);

      const ping = Date.now() - timeStart;

      let pingStatus = "Not smooth, throw your router, buddy 🐢";
      if (ping < 400) {
        pingStatus = "Smooth like butter 🧈";
      }

      const memoryUsage = (os.totalmem() - os.freemem()) / (1024 ** 2);

      const statsData = {
        uptime: uptimeString,
        date,
        time,
        users: allUsers.length,
        threads: allThreads.length,
        ping: ${ping}ms,
        pingStatus,
        memoryUsage: ${memoryUsage.toFixed(2)} MB,
      };

      let responseMessage = "";

      if (args[0] === "all") {
        responseMessage = Object.entries(statsData)
          .map(([key, value]) => **${key.toUpperCase()}:** ${value})
          .join("\n");
      } else if (args[0] && statsData.hasOwnProperty(args[0])) {
        responseMessage = **${args[0].toUpperCase()}:** ${statsData[args[0]]};
      } else {
        responseMessage = `
        *Uptime:* ${statsData.uptime}\n**Ping:** ${statsData.ping} (${statsData.pingStatus})\n**Memory Usage:** ${statsData.memoryUsage}`;
      }

      const imgURL = "https://i.imgur.com/3IOtgYq.jpg"; // Replace with your desired image URL
      const attachment = await getStreamFromURL(imgURL);

      api.sendMessage({
        body: responseMessage,
        // attachment,
      }, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  },
};
