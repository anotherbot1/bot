const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    author: "Tokodori", // Corrected author's name
    shortDescription: " ",
    longDescription: "𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐎𝐰𝐧𝐞𝐫'𝐬 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧'",
    category: "admin",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    try {
      const ownerInfo = {
        name: 'ZERODAR',
        gender: 'MALE',
        age: '18+',
        facebookLink: 'facevook.com/zeroday.was.hacker',
        instagram: 'user_died_8_8', // Added missing closing quote
      };
      const response = `
𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧:🧾
Name: ${ownerInfo.name}
Gender: ${ownerInfo.gender}
Age: ${ownerInfo.age}
Facebook: ${ownerInfo.facebookLink}
`;

      await api.sendMessage({
        body: response
      }, event.threadID, event.messageID);

      if (event.body.toLowerCase().includes('ownerinfo')) {
        api.setMessageReaction('🚀', event.messageID, (err) => {}, true);
      }
    } catch (error) {
      console.error('Error in ownerinfo command:', error);
      return api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
  },
};
