const axios = require("axios");
module.exports = {
 config: {
 name: "pinfo",
 version: "1.0",
 author: "MILAN",
 countDown: 5,
 role: 0,
 shortDescription: "Get player info",
 longDescription: {
 en: "Retrieve player information from the Milan API."
 },
 category: "𝗜𝗡𝗙𝗢",
 guide: {
 en: "{pn} <player name>"
 }
 },

 onStart: async function ({ api, event, args, message }) {
 try { 
 const playerName = args.join(' ');
 if (!playerName)
return api.sendMessage(`Search a player name bro\nFor full list of the players, type\n${global.GoatBot.config.prefix}ngc list `, event.threadID, event.messageID);
if (playerName == "list") 
return api.sendMessage(`───────────────\n❏Command Player List❏\n───────────────\n\n1. DeltaX\n2. KillerYT\n3. RuLzSR\n4. Gyantey\n5. Charii\n6. HeavenXD\n7. Joker\n8. Leon\n9. beShawL\n10. ShifuSir\n11. OnTop\n12. Turulove\n13. MrHyozu\n14. Orangee\n15. CLOUD\n16. Prabin\n17. Malik\n18. JiGGL3\n19. ASSASIN\n20. KHOONI\n21. Samir\n22. SnipeYT\n23. Gunner\n24. Gyalzen\n25. ReaperX\n26. YetaUta\n27. AJ\n28. MafiaNinja\n29. MrBoro\n30. Nima\n31. NoFear\n32. Jane\n33. Suyog\n34. SAND3SH\n35. Rigg\n36. Legend\n37. Wiffeyy\n38. Cr7Horaa\n39. Nero\n──────\nFormat:\n ${global.GoatBot.config.prefix}ngc <player name>`, event.threadID, event.messageID);
 const response = await axios.get(`https://milanbhandari.imageapi.repl.co/pubg`, {
 params: {
 apikey: 'xyzmilan',
 query: playerName
 }
 });

 const message = {body:`Here's some information about :\n\────────${response.data.id}────────\n\n❏Name: ${response.data.name}\n❏Nationality: ${response.data.nationality}\n❏Status: ${response.data.status}\n❏Team: ${response.data.team}\n❏Join Date: ${response.data.joindate}\n❏Bio: ${response.data.bio}\n❏Profile Picture:`,attachment:await global.utils.getStreamFromURL(response.data.pic)};
 return api.sendMessage(message, event.threadID);
 } catch (error) {
 console.error(error);
 message.reply("An error occurred while fetching the player's information");
 }
 }
};
