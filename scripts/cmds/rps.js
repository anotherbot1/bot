module.exports = {
  config: {
    name: "rps",
    version: "1.0",
    author: "Mesbah Bb'e",
    shortDescription: "Play rps game with bot",
    category: "𝗙𝗨𝗡",
    guide: "{pn} <rock|paper|scissors>"
  },
  onStart: async function ({ message, args }) {
    const choices = ["rock", "paper", "scissors"];
    const userChoice = args[0];
    if (!userChoice || !choices.includes(userChoice.toLowerCase())) {
      return message.reply("Please choose either rock, paper or scissors!");
    }

    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    message.reply(`you chose ${userChoice}. I choose ${botChoice}.`);

    if (userChoice.toLowerCase() === botChoice) {
      message.reply("It's a tie!");
    } else if (
      (userChoice.toLowerCase() === "rock" && botChoice === "scissors") ||
      (userChoice.toLowerCase() === "paper" && botChoice === "rock") ||
      (userChoice.toLowerCase() === "scissors" && botChoice === "paper")
    ) {
      message.reply("Congratulations! You won!");
    } else {
      message.reply("I win! Better luck next time!");
    }
  },
};