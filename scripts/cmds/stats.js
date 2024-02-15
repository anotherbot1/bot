const { getStreamFromURL } = require("fb-watchman");

module.exports = {
  config: {
    name: "stats",
    aliases: ["ping","upt","time"],
    version: "1.0",
    author: "OtinXSandip",
    role: 0,
    shortDescription: {
      en: "stats",
    },
    longDescription: {
      en: "shows stats of bot.",
    },
    category: "𝗜𝗡𝗙𝗢",
    guide: {
      en: "Use {p}stats to see stats of bot.",
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

      const uptimeString = `${hours}Hrs ${minutes}min ${seconds}sec`;

      const currentDate = new Date();
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      const date = currentDate.toLocaleDateString("en-US", options);
      const time = currentDate.toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour12: true,
      });

      const timeStart = Date.now();
      await api.sendMessage({
        body: "wait a sec boss🌝",
      }, event.threadID);

      const ping = Date.now() - timeStart;

      let pingStatus = "Not smooth throw your router, buddy";
      if (ping < 400) {
        pingStatus = "Smooth like butter";
      }

      // Assuming global.utils.getStreamFromURL(img) is correctly defined
      // const imgURL= "https://i.imgur.com/3IOtgYq.jpg";
      // const attachment = await global.utils.getStreamFromURL(imgURL);

      api.sendMessage({
        body: `😈 | Bot running time\n☞ ${uptimeString}\n📅 | Date: ${date}\n⏰| Time: ${time}\n👪 | Total Users\n☞ ${allUsers.length}\n🌸 | Total threads\n☞ ${allThreads.length}\n🌝 | Ping: ${ping}ms\nPing status: ${pingStatus}`,
      }, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  }
};