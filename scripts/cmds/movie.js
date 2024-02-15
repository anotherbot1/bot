const axios = require("axios")
module.exports = {
	config: {
		name: "movie",
		version: "1.1",
		author: "Samir",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: "see the movie info"
		},
		longDescription: {
			vi: "",
			en: "movie info"
		},
		category: "𝗜𝗡𝗙𝗢",
		guide:  {
			vi: "{pn} movie name",
			en: "{pn} movie name"
		}
		
	},

onStart: async function ({ event, message, getLang, usersData, api, args}) {

  let query = args.join(" ")
  if(!query) return message.reply("give me  movie name pre")
  try{
  let res = await axios.get(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(query)}`)
    
      let title = res.data.title,
        date = res.data.year,
        time = res.data.runtime,
        genres = res.data.genres,
        director = res.data.director,
        actors = res.data.actors,
        plot = res.data.plot
      var poster = res.data.poster;
     // console.log(res)
        message.reply(
        {
          body: `❯ 𝗧𝗜𝗧𝗟𝗘: ${title}\n❯ 𝗔𝗖𝗧𝗢𝗥𝗦: ${actors}\n❯ 𝗥𝗘𝗟𝗘𝗔𝗦 𝗗𝗔𝗧𝗘: ${date}\n❯ 𝗚𝗘𝗡𝗥𝗘𝗦: ${genres}\n❯ 𝗗𝗜𝗥𝗘𝗖𝗧𝗢𝗥: ${director}\n❯ 𝗣𝗟𝗢𝗧: ${plot}`,
          attachment: await global.utils.getStreamFromURL(poster)})
  } catch(e){
    console.log(e)
    message.reply("i don't see anything like your request ")
  }

            
}
  }