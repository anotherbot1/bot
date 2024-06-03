const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enhance your IQ and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "𝗚𝗔𝗠𝗘",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 150
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
    const { getPrefix } = global.utils;
    const c = this.config.name;
    const f = this.config.author;
    const credit = "fuсkyа";

    const p = getPrefix(event.threadID);
    if (args.length === 0) {
      message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
      return;
    }     
    if (args[0].toLowerCase() === "rank") {
      try {
        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let rank = null;
        for (let i = 0; i < playerData.length; i++) {
          if (playerData[i].playerid === event.senderID) {
            rank = i + 1;
            break;
          }
        }
        if (rank) {
          const player = playerData[rank - 1];
          const userData = await usersData.get(player.playerid);
          const name = userData.name;
          let rankMessage = `🏆Rank: ${rank}\n\n`;
          rankMessage += `Name: ${name}\n`;
          rankMessage += `Correct Answers: ${player.correct}\n`;
          rankMessage += `Wrong Answers: ${player.wrong}\n`;
          rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
          message.reply(rankMessage);
        } else {
          message.reply("You are not ranked yet.");
        }
        return;
      } catch (error) {
        console.log(error);
        message.reply('Failed to fetch rank data.');
        return;
      }
    }        

    if (args[0].toLowerCase() === "leaderboard") {
      try {
        const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

        const response = await axios.get('https://quiz-6rhj.onrender.com/api/quiz/quiz/all');
        const playerData = response.data;
        playerData.sort((a, b) => b.correct - a.correct);
        let leaderboardMessage = `│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: `;
        leaderboardMessage += `${currentDate}\n`;
        leaderboardMessage += `│Current Time: ${currentTime}\n`;

        const quizStartDate = new Date("7/15/2023");
        const quizEndDate = new Date(currentDate);
        const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
        leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
        leaderboardMessage += '=========================\n';
        let page = 1;
        let pageSize = 5;
        if (args[1] && !isNaN(args[1])) {
          page = parseInt(args[1]);
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
          const player = playerData[i];
          const userData = await usersData.get(player.playerid);
          const playerName = userData.name;

          const arraytag = [
            { id: player.playerid, tag: playerName },
            { id: player.playerid, tag: playerName }
          ];
          const msg = {
            body: `${playerName}`,
            mentions: arraytag
          };

          leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
          leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
          leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
          leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
          leaderboardMessage += '╰──────────────────\n';
        }

        leaderboardMessage += `Total Players: ${playerData.length}`;
        message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
        return;
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
        return;
      }
    }

    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮",
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "please reply your answer with this character's name\n====================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else if (args[0].toLowerCase() === "country") {
      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          return;
        }

        const text = Qdata.question;
        const link = Qdata.link;
        const txt = "Guess this country's name\n======================\n\n";
        message.reply({
          body: txt + text,
          attachment: await global.utils.getStreamFromURL(link)
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 30000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      const quizOptions = ["english", "math", "physics", "filipino", "biology", "chemistry", "history", "philosophy", "random", "science"];
      const query = args[0].toLowerCase();

      if (!quizOptions.includes(query)) {
        message.reply("Invalid category. Please choose a valid category from the list.");
        return;
      }

      try {
        const response = await axios.get(`https://quiz-6rhj.onrender.com/api/quiz/quiz?category=${query}&credit=${f} ${credit}`);
        const Qdata = response.data;

        if (!Qdata || !Qdata.answer) {
          message.reply('Failed to fetch quiz data.');
          return;
        }

        const question = Qdata.question;
        const options = Qdata.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
        const replyMessage = `${question}\n\n${options}\n\n${getLang("reply")}`;
        message.reply(replyMessage, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer.toLowerCase(),
            reward: this.config.envConfig.reward,
            options: Qdata.options
          });
          setTimeout(() => {
            message.unsend(info.messageID);
            global.GoatBot.onReply.delete(info.messageID);
          }, 20000);
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        message.reply('Failed to fetch quiz data.');
      }
    }
  },
  onReply: async function ({ event, api, Reply, message, usersData, getLang }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const correctAnswer = Reply.answer.trim().toLowerCase();
      const rewardAmount = Reply.reward;

      if (userAnswer === correctAnswer) {
        await usersData.increment(Reply.author, rewardAmount);
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, event.messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, event.messageID);
      }

      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (error) {
      console.error('Error processing quiz reply:', error);
      message.reply('An error occurred while processing your answer. Please try again.');
    }
  },
  onReaction: async function ({ event, api, Reaction, message }) {
    try {
      const { senderID, reaction, messageID } = event;
      const { author, question, fuck, fvckoff } = Reaction;

      if (senderID !== author || fvckoff) return;

      if ((reaction === '😆' && fuck === '😆') || (reaction === '😮' && fuck === '😮')) {
        api.sendMessage('Correct answer! You have been rewarded.', event.threadID, messageID);
      } else {
        api.sendMessage('Wrong answer. Better luck next time!', event.threadID, messageID);
      }

      global.GoatBot.onReaction.delete(messageID);
    } catch (error) {
      console.error('Error processing quiz reaction:', error);
      message.reply('An error occurred while processing your reaction. Please try again.');
    }
  }
};
